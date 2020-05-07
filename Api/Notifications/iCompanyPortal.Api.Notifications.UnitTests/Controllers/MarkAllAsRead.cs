using iCompanyPortal.Api.Notifications.Client;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace iCompanyPortal.Api.Notifications.UnitTests.Controllers
{
    public class MarkAllAsRead : NotificationsControllerTestsBase
    {
        [Fact]
        public async Task NoContent()
        {
            AddDbContext();
            var db = Db;
            db.AddRange(
                new Notification { NotificationId = 1, UserId = 1, CreatedAt = DateTime.Today - TimeSpan.FromDays(1) }.SetStringProperties(),
                new Notification { NotificationId = 2, UserId = 1, CreatedAt = DateTime.Today - TimeSpan.FromDays(2) }.SetStringProperties(),
                new Notification { NotificationId = 3, UserId = 1, CreatedAt = DateTime.Today - TimeSpan.FromDays(3), Subject = "Test" }
            );
            db.SaveChanges();
            var controller = GetController(1);
            var result = await controller.MarkAllAsRead();
            Assert.IsType<NoContentResult>(result);
            db = Db;
            Assert.False(db.Notifications.Any(x => !x.ReadAt.HasValue));
        }
    }
}
