using iCompanyPortal.Api.Companies.Client;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace iCompanyPortal.Api.Companies.UnitTests.Controllers.CompaniesControllerTests
{
    public class Delete : CompaniesControllerTestsBase
    {
        [Fact]
        public async Task NoContent()
        {
            AddDbContext();
            var db = Db;
            db.Add(new Company { CompanyId = 1, Status = CompanyStatus.Active });
            db.SaveChanges();
            var controller = GetController();
            var result = await controller.Delete(1);
            Assert.IsType<NoContentResult>(result);
            db = Db;
            var company = db.Companies.Single();
            Assert.Equal(CompanyStatus.PendingDeletion, company.Status);
            Assert.NotNull(company.DeleteAt);
        }
    }
}
