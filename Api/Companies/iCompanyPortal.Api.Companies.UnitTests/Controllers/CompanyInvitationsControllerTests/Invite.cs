using Castle.DynamicProxy.Generators;
using iCompanyPortal.Api.Companies.Client;
using iCompanyPortal.Api.Emailing.Client;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace iCompanyPortal.Api.Companies.UnitTests.Controllers.CompanyInvitationsControllerTests
{
    public class Invite : CompanyInvitationsControllerTestsBase
    {
        [Fact]
        public async Task NoContent()
        {
            AddDbContext();
            var db = Db;
            db.Companies.Add(new Company { CompanyId = 1 });
            db.SaveChanges();
            var controller = GetController();
            var request = new CompanyInvitationRequest().SetStringProperties();
            var result = await controller.Invite(1, "", request);
            Assert.IsType<NoContentResult>(result);
            db = Db;
            var invitation = db.CompanyInvitations.Single();
            Assert.Equal(request.Email, invitation.Email);
            Assert.Equal(1, invitation.CompanyId);
        }
    }
}
