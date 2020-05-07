using iCompanyPortal.Api.Companies.Client;
using iCompanyPortal.Api.Companies.Data;
using iCompanyPortal.Api.Companies.Filters;
using iCompanyPortal.Api.Emailing.Client;
using iCompanyPortal.Api.Users.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Controllers
{
    [Authorize]
    [Route("invitations")]
    public class CompanyInvitationsController : ControllerBase
    {
        public const string InvitationDoesNotExist = "The invitation does not exist.";

        private readonly CompaniesDbContext db;
        private readonly IEmailingClient emailingClient;
        private readonly IUsersClient usersClient;

        public CompanyInvitationsController(CompaniesDbContext db, IEmailingClient emailingClient, IUsersClient usersClient)
        {
            this.db = db;
            this.emailingClient = emailingClient;
            this.usersClient = usersClient;
        }

        [HttpGet("{companyId}/all")]
        [CompanyExists]
        [ValidateCompanyUser]
        public async Task<IActionResult> GetInvitations(int companyId)
        {
            var invitations = await db.CompanyInvitations
                .Where(x => x.CompanyId == companyId)
                .ToArrayAsync();
            return Ok(invitations);
        }

        [HttpGet("{token}")]
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
                    ["ResponseUrl"] = string.Format(responseUrl, invitation.Token)
                },
                Subject = "Company Invitation",
                TemplateKey = "CompanyInvitation",
                To = request.Email
            });

            return NoContent();
        }

        [AllowAnonymous]
        [HttpPut("{token}/{accepted}")]
        public async Task<IActionResult> Respond(Guid token, bool accepted)
        {
            var invitation = await db.CompanyInvitations
                .SingleOrDefaultAsync(x => x.Token == token);
            if (invitation == null)
            {
                return NotFound(InvitationDoesNotExist);
            }

            if (!accepted)
            {
                invitation.Status = InvitationStatus.Rejected;
            }
            else
            {
                invitation.Status = !await usersClient.IsEmailUniqueAsync(invitation.Email)
                    ? InvitationStatus.Active
                    : InvitationStatus.Accepted;
            }

            await db.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{token}")]
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
