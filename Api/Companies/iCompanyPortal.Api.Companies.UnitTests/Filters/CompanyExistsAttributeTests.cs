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
    public class CompanyExistsAttributeTests : AsyncActionFilterTestsBase<CompaniesController, CompaniesDbContext, CompanyExistsAttribute>
    {
        public CompanyExistsAttributeTests()
        {
            Services
                .AddSingleton(new Mock<IUsersClient>().Object)
                .AddEntityBuilder<CompanyEntityBuilder>()
                .AddEntityBuilder<CompanyUserEntityBuilder>()
                .AddEntityBuilder<CompanyInvitationEntityBuilder>();
        }

        [Fact]
        public async Task NotFound()
        {
            AddDbContext();
            var arguments = new Dictionary<string, object>
            {
                ["companyId"] = 1
            };
            var context = await OnActionExecutionAsync(GetController(), arguments);
            var notFound = Assert.IsType<NotFoundObjectResult>(context.Result);
            Assert.Equal(CompanyExistsAttribute.CompanyNotFound, notFound.Value);
        }
    }
}
