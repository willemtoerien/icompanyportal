using iCompanyPortal.Api.Users.Client;
using iCompanyPortal.Api.Users.Controllers;
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
    public class Confirm : UsersControllerTestsBase
    {
        [Fact]
        public async Task NotFound()
        {
            AddDbContext();
            var controller = GetController();
            var result = await controller.Confirm(ConfirmationTokenType.Email, Guid.Empty);
            result.AssertErrorMessage(UsersController.TokenNotFound, 404);
        }

        [Fact]
        public async Task NoContent()
        {
            AddDbContext();
            var db = Db;
            db.Add(new User { UserId = 1, Status = UserStatus.PendingEmailConfirmation });
            db.Add(new ConfirmationToken { UserId = 1, Type = ConfirmationTokenType.Email, Value = Guid.Empty });
            db.SaveChanges();
            var controller = GetController();
            var result = await controller.Confirm(ConfirmationTokenType.Email, Guid.Empty);
            
            Assert.IsType<NoContentResult>(result);
            db = Db;
            Assert.False(db.ConfirmationTokens.Any());
            var user = db.Users.Single();
            Assert.Equal(UserStatus.Active, user.Status);
        }
    }
}
