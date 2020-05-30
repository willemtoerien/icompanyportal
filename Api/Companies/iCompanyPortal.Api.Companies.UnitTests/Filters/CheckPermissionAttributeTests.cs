using iCompanyPortal.Api.Companies.Client;
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
    public class CheckPermissionAttributeTests : AsyncActionFilterTestsBase<CompaniesController, CompaniesDbContext, CheckPermissionAttribute>
    {
        public CheckPermissionAttributeTests()
        {
            Services
                .AddSingleton(new Mock<IUsersClient>().Object)
                .AddEntityBuilder<CompanyEntityBuilder>()
                .AddEntityBuilder<CompanyUserEntityBuilder>()
                .AddEntityBuilder<CompanyInvitationEntityBuilder>()
                .AddEntityBuilder<CompanyUserPermissionEntityBuilder>()
                .AddEntityBuilder<CompanyUserPermissionEntityBuilder>();
        }

        [Fact]
        public async Task Executing_Forbid()
        {
            AddDbContext();
            Filter.Types.Add(CompanyUserPermissionType.EditSettings);
            var arguments = new Dictionary<string, object>
            {
                ["companyId"] = 1
            };
            var context = await OnActionExecutionAsync(GetController(1), arguments);
            Assert.IsType<ForbidResult>(context.Result);
        }

        [Fact]
        public async Task Executing_Success()
        {
            Filter.Types.Add(CompanyUserPermissionType.EditSettings);
            var db = AddDbContext();
            db.CompanyUserPermissions.Add(new CompanyUserPermission
            {
                Type = CompanyUserPermissionType.EditSettings,
                CompanyId = 1,
                UserId = 1,
                IsSet = true
            });
            db.SaveChanges();
            var arguments = new Dictionary<string, object>
            {
                ["companyId"] = 1
            };
            var context = await OnActionExecutionAsync(GetController(1), arguments);
            Assert.Null(context.Result);
        }
    }
}
