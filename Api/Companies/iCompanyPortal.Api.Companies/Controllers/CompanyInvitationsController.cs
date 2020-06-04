using iCompanyPortal.Api.Companies.Client;
using iCompanyPortal.Api.Companies.Data;
using iCompanyPortal.Api.Companies.Filters;
using iCompanyPortal.Api.Emailing.Client;
using iCompanyPortal.Api.Notifications.Client;
using iCompanyPortal.Api.Users.Client;
using iCompanyPortal.Api.Users.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NSwag.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Controllers
{
    [Authorize]
    [Route("api/invitations")]
    public class CompanyInvitationsController : ControllerBase
    {
        public const string InvitationDoesNotExist = "The invitation does not exist.";

        private readonly CompaniesDbContext db;
        private readonly IEmailingClient emailingClient;
        private readonly IUsersClient usersClient;
        private readonly IAuthenticator authenticator;
        private readonly INotificationsClient notificationsClient;

        public CompanyInvitationsController(
            CompaniesDbContext db,
            IEmailingClient emailingClient,
            IUsersClient usersClient,
            IAuthenticator authenticator,
            INotificationsClient notificationsClient)
        {
            this.db = db;
            this.emailingClient = emailingClient;
            this.usersClient = usersClient;
            this.authenticator = authenticator;
            this.notificationsClient = notificationsClient;
        }

        [HttpGet("{companyId}/all")]
        [CompanyExists]
        [ValidateCompanyUser]
        [SwaggerResponse(200, typeof(CompanyInvitation[]))]
        [CheckPermission(CompanyUserPermissionType.EditSettings)]
        public async Task<IActionResult> GetInvitations(int companyId)
        {
            var invitations = await db.CompanyInvitations
                .Where(x => x.CompanyId == companyId)
                .ToArrayAsync();
            return Ok(invitations);
        }

        [HttpGet("{token}")]
        [AllowAnonymous]
        [SwaggerResponse(200, typeof(CompanyInvitation))]
        public async Task<IActionResult> Get(Guid token)
        {
            var invitation = await db.CompanyInvitations
                .Include(x => x.Company)
                .SingleOrDefaultAsync(x => x.Token == token);
            if (invitation == null)
            {
                return NotFound(InvitationDoesNotExist);
            }
            return Ok(invitation);
        }

        [HttpPost("{companyId}/{responseUrl}")]
        [CompanyExists]
        [ValidateCompanyUser]
        [SwaggerResponse(204, typeof(void))]
        [CheckPermission(CompanyUserPermissionType.EditSettings)]
        public async Task<IActionResult> Invite(int companyId, string responseUrl, [FromBody] CompanyInvitationRequest request)
        {
            if (await db.CompanyInvitations.AnyAsync(x => x.CompanyId == companyId && x.Email == request.Email))
            {
                return this.BadRequest(nameof(CompanyInvitation.Email), "An invitation has already been sent to this email.");
            }
            var invitation = new CompanyInvitation();
            invitation.Token = Guid.NewGuid();
            invitation.CompanyId = companyId;
            invitation.Email = request.Email;
            invitation.Status = InvitationStatus.Pending;
            invitation.Permissions = string.Join(",", request.Permissions);
            db.Add(invitation);
            await db.SaveChangesAsync();

            var companyName = await db.Companies
                .Where(x => x.CompanyId == companyId)
                .Select(x => x.Name)
                .SingleAsync();
            await emailingClient.SendAsync(new EmailRequest
            {
                Data = new Dictionary<string, string>
                {
                    ["CompanyName"] = companyName,
                    ["ResponseUrl"] = string.Format(WebUtility.UrlDecode(responseUrl), invitation.Token)
                },
                Subject = "Company Invitation",
                TemplateKey = "CompanyInvitation",
                To = request.Email
            });

            var responseUri = new Uri(string.Format(WebUtility.UrlDecode(responseUrl), invitation.Token));
            var user = await usersClient.GetUserByEmailAsync(request.Email);
            if (user != null)
            {
                await notificationsClient.NotifyAsync(user.UserId, new NotifyRequest
                {
                    RedirectPath = responseUri.PathAndQuery,
                    Subject = $"Company Invitation",
                    Body = $"You have been invited to to join the company <strong>{companyName}</strong>."
                });
            }

            return NoContent();
        }

        [HttpPut("{email}/{userId}/activate")]
        [AllowAnonymous]
        [SwaggerResponse(200, typeof(bool))]
        public async Task<IActionResult> Activate(string email, int userId)
        {
            var invitations = await db.CompanyInvitations
                .Where(x => x.Email == email && x.Status == InvitationStatus.Accepted)
                .ToArrayAsync();
            var madeAnActivation = false;
            foreach (var invitation in invitations)
            {
                var companyUser = new CompanyUser
                {
                    CompanyId = invitation.CompanyId,
                    UserId = userId,
                    IsFavorite = true
                };
                db.Add(companyUser);
                db.Remove(invitation);

                await db.SaveChangesAsync();
                madeAnActivation = true;
            }

            return Ok(madeAnActivation);
        }

        [AllowAnonymous]
        [HttpPut("{token}/{accepted}")]
        [SwaggerResponse(204, typeof(void))]
        public async Task<IActionResult> Respond(Guid token, bool accepted)
        {
            var invitation = await db.CompanyInvitations
                .SingleOrDefaultAsync(x => x.Token == token);
            if (invitation == null)
            {
                return NotFound(InvitationDoesNotExist);
            }

            var user = await usersClient.GetUserByEmailAsync(invitation.Email);
            var userName = user == null ? invitation.Email : $"{user.FirstName} {user.LastName}";
            var statusStr = accepted ? "accepted" : "rejected";
            var users = await db.CompanyUsers
                .Where(x => x.CompanyId == invitation.CompanyId)
                .ToArrayAsync();
            foreach (var companyUser in users)
            {
                var body = $"<strong>{userName}</strong> has {statusStr} the invitation.";
                if (user == null)
                {
                    body += " The user just need to sign up.";
                }
                await notificationsClient.NotifyAsync(companyUser.UserId, new NotifyRequest
                {
                    Subject = "Company Invitation Response",
                    Body = body
                });
            }

            if (!accepted)
            {
                invitation.Status = InvitationStatus.Rejected;
            }
            else
            {
                if (user == null)
                {
                    invitation.Status = InvitationStatus.Accepted;
                }
                else
                {
                    db.Remove(invitation);
                    var companyUser = db.Add(new CompanyUser
                    {
                        CompanyId = invitation.CompanyId,
                        UserId = user.UserId,
                        IsFavorite = true
                    }).Entity;
                    var types = invitation.Permissions.Split(',').Select(x => (CompanyUserPermissionType)int.Parse(x));
                    foreach (var type in (CompanyUserPermissionType[])Enum.GetValues(typeof(CompanyUserPermissionType)))
                    {
                        db.CompanyUserPermissions.Add(new CompanyUserPermission
                        {
                            Type = type,
                            CompanyUser = companyUser,
                            IsSet = types.Contains(type)
                        });
                    }
                    authenticator.Authenticate(HttpContext.Response, user.UserId);
                }
            }

            await db.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{token}")]
        [SwaggerResponse(204, typeof(void))]
        [CheckPermission(CompanyUserPermissionType.EditSettings)]
        public async Task<IActionResult> Delete(Guid token)
        {
            var invitation = await db.CompanyInvitations
                .SingleOrDefaultAsync(x => x.Token == token);
            if (invitation == null)
            {
                return NotFound(InvitationDoesNotExist);
            }
            var userId = this.GetUserId();
            if (!await db.CompanyUsers.AnyAsync(x => x.CompanyId == invitation.CompanyId && x.UserId == userId))
            {
                return Forbid();
            }
            db.Remove(invitation);
            await db.SaveChangesAsync();
            return Ok();
        }
    }
}
