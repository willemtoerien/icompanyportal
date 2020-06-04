using iCompanyPortal.Api.HttpHelpers;
using iCompanyPortal.Api.Notifications.Client;
using iCompanyPortal.Api.Notifications.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace iCompanyPortal.Api.Notifications.UnitTests.Controllers
{
    public class Get : NotificationsControllerTestsBase
    {
        [Fact]
        public async Task Ok()
        {
            var db = AddDbContext();
            Notification notification1, notification2, notification3;
            AddNotifications(db, out notification1, out notification2, out notification3);
            var controller = GetController(1);
            var result = await controller.GetNotifications(GetQuery.Default);
            var okResult = Assert.IsType<OkObjectResult>(result);
            var notifications = (Notification[])okResult.Value;
            Assert.Equal(notification1.NotificationId, notifications[0].NotificationId);
            Assert.Equal(notification2.NotificationId, notifications[1].NotificationId);
            Assert.Equal(notification3.NotificationId, notifications[2].NotificationId);
        }

        private static void AddNotifications(NotificationsDbContext db, out Notification notification1, out Notification notification2, out Notification notification3)
        {
            notification1 = new Notification { NotificationId = 1, UserId = 1, CreatedAt = DateTime.Today - TimeSpan.FromDays(1) }.SetStringProperties();
            notification2 = new Notification { NotificationId = 2, UserId = 1, CreatedAt = DateTime.Today - TimeSpan.FromDays(2) }.SetStringProperties();
            notification3 = new Notification { NotificationId = 3, UserId = 1, CreatedAt = DateTime.Today - TimeSpan.FromDays(3), Subject = "Test" };
            db.AddRange(notification1, notification2, notification3);
            db.SaveChanges();
        }
    }
}
