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
    public class SignIn : UsersControllerTestsBase
    {
        [Fact]
        public async Task BadRequest_EmailDoesNotExist()
        {
            AddDbContext();
            var controller = GetController();
            var result = await controller.SignIn(new SignInRequest().SetStringProperties());
            result.AssertErrorMessage(nameof(SignInRequest.Email), UsersController.EmailDoesNotExist);
        }

        [Fact]
        public async Task BadRequest_IncorrectPassword()
        {
            AddDbContext();
            var db = Db;
            db.Add(new User { UserId = 1, Email = "Email", Password = "Test" });
            db.SaveChanges();
            var controller = GetController();
            var result = await controller.SignIn(new SignInRequest().SetStringProperties());
            result.AssertErrorMessage(nameof(SignInRequest.Password), UsersController.IncorrectPassword);

        }

        [Fact]
        public async Task NoContent()
        {
            AddDbContext();
            var db = Db;
            var hasher = Provider.GetService<PasswordHasher>();
            db.Add(new User { UserId = 1, Email = "Email", Password = hasher.Hash("Password"), DeleteAt = DateTime.Now, Status = UserStatus.PendingDeletion });
            db.Add(new ConfirmationToken { UserId = 1, Type = ConfirmationTokenType.Email });
            db.SaveChanges();
            var controller = GetController();
            var result = await controller.SignIn(new SignInRequest().SetStringProperties());
            Assert.IsType<NoContentResult>(result);
            db = Db;
            var user = db.Users.Single();
            Assert.Equal(UserStatus.PendingEmailConfirmation, user.Status);
            Assert.Null(user.DeleteAt);
        }
    }
}
