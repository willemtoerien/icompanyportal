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
using Microsoft.Extensions.DependencyInjection;
using iCompanyPortal.Api.Users.Services;

namespace iCompanyPortal.Api.Users.UnitTests.Controllers
{
    public class Save : UsersControllerTestsBase
    {
        [Fact]
        public async Task BadRequest_EmailAlreadyInUse()
        {
            var db = AddDbContext();
            db.Add(new User { UserId = 1, Email = "test1" });
            db.Add(new User { UserId = 2, Email = "test2" });
            db.SaveChanges();
            var controller = GetController(1);
            var result = await controller.Save("", new SaveUserRequest { Email = "test2" });
            result.AssertErrorMessage(nameof(SignUpRequest.Email), UsersController.EmailAlreadyInUse);
        }

        [Fact]
        public async Task NoContent()
        {
            var db = AddDbContext();
            db.Add(new User { UserId = 1 });
            db.SaveChanges();
            var request = new SaveUserRequest().SetStringProperties();
            var controller = GetController(1);
            var result = await controller.Save("", request);
            
            Assert.IsType<NoContentResult>(result);
            db = Db;
            var hasher = Provider.GetService<PasswordHasher>();
            var token = db.ConfirmationTokens.Single();
            var user = db.Users.Single();
            Assert.Equal(request.Email, user.Email);
            Assert.Equal(request.FirstName, user.FirstName);
            Assert.Equal(request.LastName, user.LastName);
            Assert.True(hasher.Verify(user.Password, request.Password));
            Assert.Equal(UserStatus.PendingEmailConfirmation, user.Status);
            Assert.Equal(ConfirmationTokenType.Email, token.Type);
        }
    }
}
