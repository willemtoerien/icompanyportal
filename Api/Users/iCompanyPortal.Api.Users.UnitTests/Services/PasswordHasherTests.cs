using iCompanyPortal.Api.UnitTestHelpers;
using iCompanyPortal.Api.Users.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace iCompanyPortal.Api.Users.UnitTests.Services
{
    public class PasswordHasherTests : ServiceTestsBase<PasswordHasher>
    {
        public PasswordHasherTests()
        {
            var options = new Mock<IOptions<UsersSettings>>();
            options.SetupGet(x => x.Value).Returns(new UsersSettings { HashSalt = Guid.Empty.ToString() });
            Services.AddSingleton(options.Object);
        }

        [Fact]
        public void PasswordsAreHashedCorrectly()
        {
            var text = "test";
            var hash = Service.Hash(text);
            Assert.True(Service.Verify(hash, text));
        }
    }
}
