using iCompanyPortal.Api.Companies.Client;
using iCompanyPortal.Api.Companies.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace iCompanyPortal.Api.Companies.UnitTests.Controllers.CompaniesControllerTests
{
    public class Create : CompaniesControllerTestsBase
    {
        [Fact]
        public async Task BadRequest_UniqueNameNotUnique()
        {
            AddDbContext();
            var db = Db;
            db.Add(new Company().SetStringProperties());
            db.SaveChanges();
            var controller = GetController(1);
            var result = await controller.Create(new SaveCompanyRequest().SetStringProperties());
            result.AssertErrorMessage(nameof(SaveCompanyRequest.UniqueName), CompaniesController.UniqueNameNotUnique);
        }

        [Fact]
        public async Task Ok()
        {
            AddDbContext();
            var controller = GetController(1);
            var request = new SaveCompanyRequest().SetStringProperties();
            var result = await controller.Create(request);
            var ok = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(1, ok.Value);
            var db = Db;
            var company = db.Companies.Single();
            Assert.Equal(request.Name, company.Name);
            Assert.Equal(request.UniqueName, company.UniqueName);
            Assert.Equal(CompanyStatus.Active, company.Status);
            var user = db.CompanyUsers.Single();
            Assert.Equal(1, user.UserId);
        }
    }
}
