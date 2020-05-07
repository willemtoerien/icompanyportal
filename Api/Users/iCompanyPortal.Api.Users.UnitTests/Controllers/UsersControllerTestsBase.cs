using iCompanyPortal.Api.Emailing.Client;
using iCompanyPortal.Api.Shared.Data;
using iCompanyPortal.Api.UnitTestHelpers;
using iCompanyPortal.Api.Users.Controllers;
using iCompanyPortal.Api.Users.Data;
using iCompanyPortal.Api.Users.Shared;
using Microsoft.Extensions.DependencyInjection;
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
            Services
                .AddTransient<EntityBuilder, UserEntityBuilder>()
                .AddTransient<EntityBuilder, ConfirmationTokenEntityBuilder>()
                .AddSingleton(new Mock<IAuthenticator>().Object)
                .AddSingleton(new Mock<IEmailingClient>().Object);
        }
    }
}
