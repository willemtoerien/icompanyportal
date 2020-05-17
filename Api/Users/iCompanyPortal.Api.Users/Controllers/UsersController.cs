using iCompanyPortal.Api.Emailing.Client;
using iCompanyPortal.Api.Shared.Filters;
using iCompanyPortal.Api.Users.Client;
using iCompanyPortal.Api.Users.Data;
using iCompanyPortal.Api.Users.Services;
using iCompanyPortal.Api.Users.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Users.Controllers
{
    [Route("")]
    [AllowAnonymous]
    public class UsersController : ControllerBase
    {
        public const string EmailAlreadyInUse = "The email you provided is already in use.";
        public const string TokenNotFound = "The token provided does not exist.";
        public const string EmailDoesNotExist = "The email provided does not exist.";
        public const string IncorrectPassword = "The password provided is incorrect.";
        public const string UserNotFound = "The user was not found.";

        private readonly IAuthenticator authenticator;
        private readonly UsersDbContext db;
        private readonly IEmailingClient emailingClient;
        private readonly PasswordHasher passwordHasher;

        public UsersController(IAuthenticator authenticator, UsersDbContext db, IEmailingClient emailingClient, PasswordHasher passwordHasher)
        {
            this.authenticator = authenticator;
            this.db = db;
            this.emailingClient = emailingClient;
            this.passwordHasher = passwordHasher;
        }

        [HttpGet("{userId}/exists")]
        public async Task<IActionResult> DoesUserExist(int userId)
        {
            return Ok(await db.Users.AnyAsync(x => x.UserId == userId));
        }

        [HttpGet("{email}/is-unique")]
        public async Task<IActionResult> IsEmailUnique(string email)
        {
            return Ok(!await db.Users.AnyAsync(x => x.Email == email));
        }

        [HttpGet]
        public async Task<IActionResult> GetSignedInUser()
        {
            try
            {
                var userId = this.GetUserId();
                var user = await db.Users.SingleOrDefaultAsync(x => x.UserId == userId);
                var info = ToUserInfo(user);
                return Ok(info);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUser(int userId)
        {
            var user = await db.Users.SingleOrDefaultAsync(x => x.UserId == userId);
            if (user == null)
            {
                return NotFound(UserNotFound);
            }
            var info = ToUserInfo(user);
            return Ok(info);
        }

        [HttpGet("users/{userIds}")]
        public async Task<IActionResult> GetUsers(string userIds)
        {
            var ids = userIds.Split(',').Select(x => int.Parse(x));
            var users = await db.Users
                .Where(x => ids.Contains(x.UserId))
                .ToArrayAsync();
            return Ok(users.Select(x => ToUserInfo(x)));

        }

        [HttpGet("by-email/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await db.Users.SingleOrDefaultAsync(x => x.Email == email);
            if (user == null)
            {
                return NotFound(UserNotFound);
            }
            var info = ToUserInfo(user);
            return Ok(info);
        }

        [HttpPut("reset-password/{responseUrl}")]
        [ValidateModel]
        public async Task<IActionResult> ResetPassword(string responseUrl, [FromBody] ResetPasswordRequest request)
        {
            var user = await db.Users
                .Include(x => x.ConfirmationTokens)
                .Where(x => x.Email == request.Email)
                .Select(x => new
                {
                    x.ConfirmationTokens,
                    x.UserId
                })
                .SingleOrDefaultAsync();

            if (user == null)
            {
                return this.BadRequest(nameof(SignInRequest.Email), EmailDoesNotExist);
            }

            var token = user.ConfirmationTokens.SingleOrDefault(x => x.Type == ConfirmationTokenType.ResetPassword);
            if (token == null)
            {
                token = new ConfirmationToken
                {
                    Type = ConfirmationTokenType.ResetPassword,
                    UserId = user.UserId,
                    Value = Guid.NewGuid()
                };
                db.Add(token);
            }

            await db.SaveChangesAsync();

            await emailingClient.SendAsync(new EmailRequest
            {
                Data = new Dictionary<string, string>
                {
                    ["ResponseUrl"] = string.Format(responseUrl, token.Value)
                },
                Subject = "Reset Password",
                TemplateKey = "ResetPassword",
                To = request.Email
            });

            return NoContent();
        }

        [HttpPut("sign-in")]
        [ValidateModel]
        public async Task<IActionResult> SignIn([FromBody] SignInRequest request)
        {
            var user = await db.Users
                .Where(x => x.Email == request.Email)
                .Select(x => new User
                {
                    UserId = x.UserId,
                    Password = x.Password,
                    Status = x.Status,
                    DeleteAt = x.DeleteAt
                })
                .SingleOrDefaultAsync();
            if (user == null)
            {
                return this.BadRequest(nameof(SignInRequest.Email), EmailDoesNotExist);
            }
            db.Attach(user);

            if (!passwordHasher.Verify(user.Password, request.Password))
            {
                return this.BadRequest(nameof(SignInRequest.Password), IncorrectPassword);
            }

            if (user.Status == UserStatus.PendingDeletion)
            {
                var isEmailConfirmed = !await db.ConfirmationTokens.AnyAsync(x => x.UserId == user.UserId && x.Type == ConfirmationTokenType.Email);
                user.Status = isEmailConfirmed ? UserStatus.Active : UserStatus.PendingEmailConfirmation;
                user.DeleteAt = null;
                await db.SaveChangesAsync();
            }

            authenticator.Authenticate(HttpContext.Response, user.UserId);

            return NoContent();
        }

        [HttpPut("{responseUrl}")]
        [ValidateModel]
        [Authorize]
        public async Task<IActionResult> Save(string responseUrl, [FromBody] SaveUserRequest request)
        {
            var userId = this.GetUserId();
            var user = await db.Users.SingleOrDefaultAsync(x => x.UserId == userId);

            if (!string.Equals(user.Email, request.Email, StringComparison.OrdinalIgnoreCase))
            {
                if (await db.Users.AnyAsync(x => x.Email == request.Email))
                {
                    return this.BadRequest(nameof(SaveUserRequest.Email), EmailAlreadyInUse);
                }

                user.Email = request.Email;
                user.Status = UserStatus.PendingEmailConfirmation;

                await SendEmailConfirmationToken(responseUrl, userId, user.Email);
            }

            if (!string.IsNullOrWhiteSpace(request.Password) && !string.Equals(user.Password, request.Password))
            {
                user.Password = passwordHasher.Hash(request.Password);
            }

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;

            await db.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("confirm/{type}/{value}")]
        public async Task<IActionResult> Confirm(ConfirmationTokenType type, Guid value)
        {
            var query =
                from ct in db.ConfirmationTokens
                join u in db.Users
                  on ct.UserId equals u.UserId
                where ct.Type == type && ct.Value == value
                select new
                {
                    ConfirmationToken = ct,
                    User = new User { UserId = u.UserId, Status = u.Status }
                };

            var result = await query.SingleOrDefaultAsync();

            if (result == null)
            {
                return NotFound(TokenNotFound);
            }

            db.Attach(result.ConfirmationToken);
            db.Attach(result.User);

            result.User.Status = UserStatus.Active;
            db.ConfirmationTokens.Remove(result.ConfirmationToken);

            await db.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("/resend-email-confirmation/{responseUrl}")]
        [Authorize]
        public async Task<IActionResult> ResendEmailConfirmation(string responseUrl)
        {
            var userId = this.GetUserId();

            var query =
                from ct in db.ConfirmationTokens
                join u in db.Users
                    on ct.UserId equals u.UserId
                where ct.Type == ConfirmationTokenType.Email && ct.UserId == userId
                select new
                {
                    u.Email,
                    ct.Value
                };

            var result = await query.SingleAsync();

            await emailingClient.SendAsync(new EmailRequest
            {
                Data = new Dictionary<string, string>
                {
                    ["ResponseUrl"] = string.Format(responseUrl, result.Value)
                },
                Subject = "Email Confirmation",
                TemplateKey = "EmailConfirmation",
                To = result.Email
            });

            return NoContent();
        }

        [HttpPost("{responseUrl}")]
        [ValidateModel]
        public async Task<IActionResult> SignUp(string responseUrl, [FromBody] SignUpRequest request)
        {
            if (await db.Users.AnyAsync(x => x.Email == request.Email))
            {
                return this.BadRequest(nameof(SignUpRequest.Email), EmailAlreadyInUse);
            }

            var user = new User
            {
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Password = passwordHasher.Hash(request.Password),
                Status = UserStatus.PendingEmailConfirmation
            };
            db.Add(user);

            await db.SaveChangesAsync();

            await SendEmailConfirmationToken(responseUrl, user.UserId, user.Email);

            await db.SaveChangesAsync();

            authenticator.Authenticate(HttpContext.Response, user.UserId);

            return NoContent();
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete()
        {
            var userId = this.GetUserId();
            var user = await db.Users
                .Where(x => x.UserId == userId)
                .Select(x => new User { UserId = x.UserId, Status = x.Status, DeleteAt = x.DeleteAt })
                .SingleAsync();
            db.Attach(user);

            user.DeleteAt = DateTime.Today.AddMonths(1);
            user.Status = UserStatus.PendingDeletion;

            await db.SaveChangesAsync();

            return NoContent();
        }

        private async Task SendEmailConfirmationToken(string responseUrl, int userId, string to)
        {
            var token = await db.ConfirmationTokens.SingleOrDefaultAsync(x => x.Type == ConfirmationTokenType.Email && x.UserId == userId);
            if (token == null)
            {
                token = new ConfirmationToken
                {
                    UserId = userId,
                    Type = ConfirmationTokenType.Email,
                    Value = Guid.NewGuid()
                };
                db.Add(token);
            }
            await emailingClient.SendAsync(new EmailRequest
            {
                Data = new Dictionary<string, string>
                {
                    ["ResponseUrl"] = string.Format(responseUrl, token.Value)
                },
                Subject = "Email Confirmation",
                TemplateKey = "EmailConfirmation",
                To = to
            });
        }

        private static UserInfo ToUserInfo(User user)
        {
            return new UserInfo
            {
                DeleteAt = user.DeleteAt,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Status = user.Status,
                UserId = user.UserId
            };
        }
    }
}
