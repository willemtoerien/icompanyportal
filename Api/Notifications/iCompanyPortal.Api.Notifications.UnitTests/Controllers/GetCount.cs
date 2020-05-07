using iCompanyPortal.Api.Notifications.Client;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace iCompanyPortal.Api.Notifications.UnitTests.Controllers
{
    public class GetCount : NotificationsControllerTestsBase
    {
        [Fact]
        public async Task Ok()
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
            var result = await controller.GetCount();
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(3, okResult.Value);
        }
    }
}
