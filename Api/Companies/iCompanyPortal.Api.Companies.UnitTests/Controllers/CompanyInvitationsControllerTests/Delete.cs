using iCompanyPortal.Api.Companies.Client;
using iCompanyPortal.Api.Companies.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace iCompanyPortal.Api.Companies.UnitTests.Controllers.CompanyInvitationsControllerTests
{
    public class Delete : CompanyInvitationsControllerTestsBase
    {
        [Fact]
        public async Task NotFound()
        {
            AddDbContext();
            var controller = GetController();
            var result = await controller.Delete(Guid.Empty);
            var notFound = Assert.IsType<NotFoundObjectResult>(result);
            notFound.AssertErrorMessage(CompanyInvitationsController.InvitationDoesNotExist, 404);
        }

        [Fact]
        public async Task Forbid()
        {
            var db = AddDbContext();
            db.Add(new CompanyUser { CompanyId = 1, UserId = 1 });
            var originalInvitation = new CompanyInvitation { Status = InvitationStatus.Pending }.SetStringProperties();
            db.Add(originalInvitation);
            db.SaveChanges();
            var controller = GetController(1);
            var result = await controller.Delete(originalInvitation.Token);
            Assert.IsType<ForbidResult>(result);
        }
    }
}
