using iCompanyPortal.Api.Users.Client;
using iCompanyPortal.Api.Users.Controllers;
using iCompanyPortal.Api.Users.Data;
using iCompanyPortal.Api.Users.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Microsoft.Extensions.DependencyInjection;

namespace iCompanyPortal.Api.Users.UnitTests.Controllers
{
    public class SignUp : UsersControllerTestsBase
    {
        [Fact]
        public async Task BadRequest_EmailAlreadyInUse()
        {
            var db = AddDbContext();
            db.Add(new User { Email = "test" });
            db.SaveChanges();
            var controller = GetController();
            var result = await controller.SignUp("", new SignUpRequest { Email = "test" });
            result.AssertErrorMessage(nameof(SignUpRequest.Email), UsersController.EmailAlreadyInUse);
        }

        [Fact]
        public async Task NoContent()
        {
            AddDbContext();
            var controller = GetController();
            var request = new SignUpRequest().SetStringProperties();
            var result = await controller.SignUp("", request);
            Assert.IsType<NoContentResult>(result);
            var db = Db;
            var hasher = Provider.GetService<PasswordHasher>();
            var user = db.Users.Single();
            Assert.Equal(request.Email, user.Email);
            Assert.Equal(request.FirstName, user.FirstName);
            Assert.Equal(request.LastName, user.LastName);
            Assert.True(hasher.Verify(user.Password, request.Password));
            Assert.Equal(UserStatus.PendingEmailConfirmation, user.Status);
        }
    }
}
