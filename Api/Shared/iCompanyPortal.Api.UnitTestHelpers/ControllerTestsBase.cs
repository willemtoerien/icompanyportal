using iCompanyPortal.Api.Shared.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using System.Runtime.CompilerServices;
using System.Security.Claims;

namespace iCompanyPortal.Api.UnitTestHelpers
{
    public class ControllerTestsBase<TController, TDbContext> : ServiceTestsBase<TController, TDbContext>
        where TController : ControllerBase
        where TDbContext : ProjectDbContext
    {
        protected ControllerTestsBase()
             : base()
        {
            Services.AddTransient<TController>();
        }

        public virtual TController GetController(int? signedInUserId = null)
        {
            var controller = Provider.GetService<TController>();
            var principalMock = new Mock<ClaimsPrincipal>();
            var identityMock = new Mock<ClaimsIdentity>();
            if (signedInUserId.HasValue)
            {
                identityMock.Setup(x => x.IsAuthenticated).Returns(true);
                identityMock.Setup(x => x.Claims).Returns(new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, signedInUserId.ToString())
                    });
            }
            principalMock.Setup(x => x.Identity).Returns(identityMock.Object);

            controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = principalMock.Object
                }
            };
            return controller;
        }
    }
}
