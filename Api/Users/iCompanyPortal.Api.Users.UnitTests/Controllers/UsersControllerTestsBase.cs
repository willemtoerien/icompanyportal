using iCompanyPortal.Api.Emailing.Client;
using iCompanyPortal.Api.Shared.Data;
using iCompanyPortal.Api.UnitTestHelpers;
using iCompanyPortal.Api.Users.Controllers;
using iCompanyPortal.Api.Users.Data;
using iCompanyPortal.Api.Users.Services;
using iCompanyPortal.Api.Users.Shared;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Users.UnitTests.Controllers
{
    public abstract class UsersControllerTestsBase : ControllerTestsBase<UsersController, UsersDbContext>
    {
        protected UsersControllerTestsBase()
        {
            var options = new Mock<IOptions<UsersSettings>>();
            options.SetupGet(x => x.Value).Returns(new UsersSettings { HashSalt = Guid.Empty.ToString() });
            Services
                .AddSingleton(options.Object)
                .AddTransient<PasswordHasher>()
                .AddTransient<EntityBuilder, UserEntityBuilder>()
                .AddTransient<EntityBuilder, ConfirmationTokenEntityBuilder>()
                .AddSingleton(new Mock<IAuthenticator>().Object)
                .AddSingleton(new Mock<IEmailingClient>().Object);
        }
    }
}
