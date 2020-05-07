using iCompanyPortal.Api.Emailing.Client;
using iCompanyPortal.Api.Emailing.Data;
using iCompanyPortal.Api.Emailing.Services;
using iCompanyPortal.Api.UnitTestHelpers;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace iCompanyPortal.Api.Emailing.UnitTests.Services
{
    public class EmailSenderTests : ServiceTestsBase<EmailSender, EmailingDbContext>
    {
        public EmailSenderTests()
            : base()
        {
            Services = Services.Configure<EmailSettings>(x =>
                {
                    x.IsEnabled = false;
                })
                .AddSingleton(new Mock<ITemplator>().Object);
        }

        [Fact]
        public async Task EmailsCreatedCorrectly()
        {
            AddDbContext();
            var service = Service;
            var request = new EmailRequest
            {
                Data = new Dictionary<string, string>
                {
                    ["ResponseUrl"] = "http://localhost"
                },
                Subject = "Subject",
                TemplateKey = "EmailConfirmation",
                To = "test@test.com"
            };
            await service.SendAsync(request);
            var db = Db;
            var email = db.Emails.Single();
            Assert.Equal(request.Subject, email.Subject);
            Assert.Equal(request.To, email.To);
            Assert.Equal(request.TemplateKey, email.TemplateKey);
        }
    }
}
