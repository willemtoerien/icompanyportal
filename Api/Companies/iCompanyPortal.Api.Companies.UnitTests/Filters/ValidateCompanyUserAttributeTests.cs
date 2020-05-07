using iCompanyPortal.Api.Companies.Controllers;
using iCompanyPortal.Api.Companies.Data;
using iCompanyPortal.Api.Companies.Filters;
using iCompanyPortal.Api.UnitTestHelpers;
using iCompanyPortal.Api.Users.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace iCompanyPortal.Api.Companies.UnitTests.Filters
{
    public class ValidateCompanyUserAttributeTests : AsyncActionFilterTestsBase<CompaniesController, CompaniesDbContext, ValidateCompanyUserAttribute>
    {
        public ValidateCompanyUserAttributeTests()
        {
            Services
                .AddSingleton(new Mock<IUsersClient>().Object)
                .AddEntityBuilder<CompanyEntityBuilder>()
                .AddEntityBuilder<CompanyUserEntityBuilder>()
                .AddEntityBuilder<CompanyInvitationEntityBuilder>();
        }

        [Fact]
        public async Task Executing()
        {
            AddDbContext();
            var arguments = new Dictionary<string, object>
            {
                ["companyId"] = 1
            };
            var context = await OnActionExecutionAsync(GetController(1), arguments);
            Assert.IsType<ForbidResult>(context.Result);
        }
    }
}
