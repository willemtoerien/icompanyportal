using iCompanyPortal.Api.Companies.Client;
using iCompanyPortal.Api.Companies.Controllers;
using iCompanyPortal.Api.Users.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace iCompanyPortal.Api.Companies.UnitTests.Controllers.CompanyInvitationsControllerTests
{
    public class Respond : CompanyInvitationsControllerTestsBase
    {
        [Fact]
        public async Task NotFound()
        {
            AddDbContext();
            var controller = GetController();
            var result = await controller.Respond(Guid.Empty, true);
            var notFound = Assert.IsType<NotFoundObjectResult>(result);
            notFound.AssertErrorMessage(CompanyInvitationsController.InvitationDoesNotExist, 404);
        }

        [Fact]
        public async Task NoContent_Rejected()
        {
            var db = AddDbContext();
            var originalInvitation = new CompanyInvitation { Status = InvitationStatus.Pending }.SetStringProperties();
            db.Add(originalInvitation);
            db.SaveChanges();
            var controller = GetController();
            var result = await controller.Respond(originalInvitation.Token, false);
            Assert.IsType<NoContentResult>(result);
            db = Db;
            var invitation = db.CompanyInvitations.Single();
            Assert.Equal(InvitationStatus.Rejected, invitation.Status);
        }

        [Fact]
        public async Task NoContent_Accepted()
        {
            var usersClientMock = new Mock<IUsersClient>();
            usersClientMock.Setup(x => x.IsEmailUniqueAsync(It.IsAny<string>())).ReturnsAsync(true);
            Services.AddSingleton(usersClientMock.Object);
            var db = AddDbContext();
            var originalInvitation = new CompanyInvitation { Status = InvitationStatus.Pending }.SetStringProperties();
            db.Add(originalInvitation);
            db.SaveChanges();
            var controller = GetController();
            var result = await controller.Respond(originalInvitation.Token, true);
            Assert.IsType<NoContentResult>(result);
            db = Db;
            var invitation = db.CompanyInvitations.Single();
            Assert.Equal(InvitationStatus.Accepted, invitation.Status);
        }

        [Fact]
        public async Task NoContent_Active()
        {
            var usersClientMock = new Mock<IUsersClient>();
            usersClientMock.Setup(x => x.GetUserByEmailAsync(It.IsAny<string>())).ReturnsAsync(new UserInfo
            {
                UserId = 1
            });
            Services.AddSingleton(usersClientMock.Object);
            var db = AddDbContext();
            var originalInvitation = new CompanyInvitation { Status = InvitationStatus.Pending }.SetStringProperties();
            db.Add(originalInvitation);
            db.SaveChanges();
            var controller = GetController();
            var result = await controller.Respond(originalInvitation.Token, true);
            Assert.IsType<NoContentResult>(result);
            db = Db;
            var companyUser = db.CompanyUsers.Single();
            Assert.Equal(1, companyUser.UserId);
            Assert.False(db.CompanyInvitations.Any());
        }
    }
}
