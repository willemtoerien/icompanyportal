using iCompanyPortal.Api.Companies.Client;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace iCompanyPortal.Api.Companies.UnitTests.Controllers.CompanyInvitationsControllerTests
{
    public class Activate : CompanyInvitationsControllerTestsBase
    {
        public async Task Ok_Activated()
        {
            var db = AddDbContext();
            var invitation = new CompanyInvitation
            {
                CompanyId = 1,
                Email = "Email",
                Status = InvitationStatus.Accepted,
                Token = Guid.Empty
            };
            db.Add(invitation);
            db.SaveChanges();
            var controller = GetController();
            var result = await controller.Activate(invitation.Email, 8);
            var ok = Assert.IsType<OkObjectResult>(result);
            Assert.True((bool)ok.Value);
        }

        public async Task Ok_NotActivated()
        {
            var controller = GetController();
            var result = await controller.Activate("Email", 8);
            var ok = Assert.IsType<OkObjectResult>(result);
            Assert.False((bool)ok.Value);
        }
    }
}
