using iCompanyPortal.Api.Companies.Controllers;
using iCompanyPortal.Api.Companies.Data;
using iCompanyPortal.Api.UnitTestHelpers;
using iCompanyPortal.Api.Users.Client;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;

namespace iCompanyPortal.Api.Companies.UnitTests.Controllers.CompaniesControllerTests
{
    public class CompaniesControllerTestsBase : ControllerTestsBase<CompaniesController, CompaniesDbContext>
    {
        public CompaniesControllerTestsBase()
        {
            Services
                .AddSingleton(new Mock<IUsersClient>().Object)
                .AddEntityBuilder<CompanyEntityBuilder>()
                .AddEntityBuilder<CompanyUserEntityBuilder>()
                .AddEntityBuilder<CompanyInvitationEntityBuilder>();
        }
    }
}
