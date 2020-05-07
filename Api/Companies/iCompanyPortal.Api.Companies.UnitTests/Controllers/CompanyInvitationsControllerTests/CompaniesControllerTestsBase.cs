using iCompanyPortal.Api.Companies.Controllers;
using iCompanyPortal.Api.Companies.Data;
using iCompanyPortal.Api.Emailing.Client;
using iCompanyPortal.Api.UnitTestHelpers;
using iCompanyPortal.Api.Users.Client;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;

namespace iCompanyPortal.Api.Companies.UnitTests.Controllers.CompanyInvitationsControllerTests
{
    public class CompanyInvitationsControllerTestsBase : ControllerTestsBase<CompanyInvitationsController, CompaniesDbContext>
    {
        public CompanyInvitationsControllerTestsBase()
        {
            Services
                .AddSingleton(new Mock<IUsersClient>().Object)
                .AddSingleton(new Mock<IEmailingClient>().Object)
                .AddEntityBuilder<CompanyEntityBuilder>()
                .AddEntityBuilder<CompanyUserEntityBuilder>()
                .AddEntityBuilder<CompanyInvitationEntityBuilder>();
        }
    }
}
