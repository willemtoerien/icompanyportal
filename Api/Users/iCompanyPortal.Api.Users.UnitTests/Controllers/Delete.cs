using iCompanyPortal.Api.Users.Client;
using iCompanyPortal.Api.Users.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace iCompanyPortal.Api.Users.UnitTests.Controllers
{
    public class Delete : UsersControllerTestsBase
    {
        [Fact]
        public async Task NoContent()
        {
            var db = AddDbContext();
            db.Add(new User { UserId = 1 });
            db.SaveChanges();
            var controller = GetController(1);
            var result = await controller.Delete();

            Assert.IsType<NoContentResult>(result);
            db = Db;
            var user = db.Users.Single();
            Assert.Equal(UserStatus.PendingDeletion, user.Status);
            Assert.NotNull(user.DeleteAt);
        }
    }
}
