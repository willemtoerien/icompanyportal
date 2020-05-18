using iCompanyPortal.Api.Users.Client;
using iCompanyPortal.Api.Users.Controllers;
using iCompanyPortal.Api.Users.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace iCompanyPortal.Api.Users.UnitTests.Controllers
{
    public class ResetPassword : UsersControllerTestsBase
    {
        [Fact]
        public async Task BadRequest_EmailDoesNotExist()
        {
            AddDbContext();
            var controller = GetController();
            var result = await controller.ResetPassword("", new ResetPasswordRequest().SetStringProperties());
            result.AssertErrorMessage(nameof(ResetPasswordRequest.Email), UsersController.EmailDoesNotExist);
        }

        [Fact]
        public async Task NoContent()
        {
            var db = AddDbContext();
            db.Add(new User { UserId = 1, Email = "Email" });
            db.SaveChanges();
            var controller = GetController();
            var result = await controller.ResetPassword("", new ResetPasswordRequest().SetStringProperties());
            Assert.IsType<NoContentResult>(result);
        }
    }
}
