using iCompanyPortal.Api.Users.Client;
using iCompanyPortal.Api.Users.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace iCompanyPortal.Api.Users.UnitTests.Controllers
{
    public class ResendEmailConfirmation : UsersControllerTestsBase
    {
        [Fact]
        public async Task NoContent()
        {
            var db = AddDbContext();
            db.Add(new User { UserId = 1 });
            var tokenValue = Guid.NewGuid();
            db.Add(new ConfirmationToken { Type = ConfirmationTokenType.Email, UserId = 1, Value = tokenValue });
            db.SaveChanges();
            var controller = GetController(1);
            var result = await controller.ResendEmailConfirmation("");
            Assert.IsType<NoContentResult>(result);
        }
    }
}
