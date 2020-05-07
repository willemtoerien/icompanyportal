using iCompanyPortal.Api.Notifications.Client;
using iCompanyPortal.Api.Notifications.Controllers;
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

namespace iCompanyPortal.Api.Notifications.UnitTests.Controllers
{
    public class Notify : NotificationsControllerTestsBase
    {
        [Fact]
        public async Task Ok()
        {
            var usersClientMock = new Mock<IUsersClient>();
            usersClientMock.Setup(x => x.DoesUserExistAsync(It.IsAny<int>())).ReturnsAsync(true);
            Services.AddSingleton(usersClientMock.Object);
            AddDbContext();
            var request = new NotifyRequest().SetStringProperties();
            var controller = GetController(1);
            var result = await controller.Notify(2, request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(1, okResult.Value);
            var db = Db;
            var notification = db.Notifications.Single();
            Assert.Equal(request.Subject, notification.Subject);
            Assert.Equal(request.Message, notification.Message);
            Assert.Equal(2, notification.UserId);
        }

        [Fact]
        public async Task BadRequest()
        {
            var usersClientMock = new Mock<IUsersClient>();
            usersClientMock.Setup(x => x.DoesUserExistAsync(It.IsAny<int>())).ReturnsAsync(false);
            Services.AddSingleton(usersClientMock.Object);
            AddDbContext();
            var request = new NotifyRequest().SetStringProperties();
            var controller = GetController(1);
            var result = await controller.Notify(2, request);
            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal(string.Format(NotificationsController.UserDoesNotExist, 2), badRequest.Value);
        }
    }
}
