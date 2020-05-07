using iCompanyPortal.Api.Notifications.Controllers;
using iCompanyPortal.Api.Notifications.Data;
using iCompanyPortal.Api.Notifications.Hubs;
using iCompanyPortal.Api.Shared.Data;
using iCompanyPortal.Api.UnitTestHelpers;
using iCompanyPortal.Api.Users.Client;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;

namespace iCompanyPortal.Api.Notifications.UnitTests.Controllers
{
    public abstract class NotificationsControllerTestsBase : ControllerTestsBase<NotificationsController, NotificationsDbContext>
    {
        public NotificationsControllerTestsBase()
        {
            var mockHub = new Mock<IHubContext<NotificationsHub>>();
            var mockHubClients = new Mock<IHubClients>();
            var mockClientProxy = new Mock<IClientProxy>();
            var clientProxy = mockClientProxy.Object;
            mockHubClients.Setup(x => x.User(It.IsAny<string>())).Returns(clientProxy);
            mockHub.SetupGet(x => x.Clients).Returns(mockHubClients.Object);
            Services
                .AddSingleton(new Mock<IUsersClient>().Object)
                .AddTransient<EntityBuilder, NotificationEntityBuilder>()
                .AddSingleton(mockHub.Object);
        }
    }
}
