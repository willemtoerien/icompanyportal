using iCompanyPortal.Api.Shared.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;

namespace iCompanyPortal.Api.UnitTestHelpers
{
    public class ServiceTestsBase<TService>
        where TService : class
    {
        protected IServiceCollection Services;

        protected IServiceProvider Provider => Services.BuildServiceProvider();

        protected TService Service => Provider.GetService<TService>();

        protected ServiceTestsBase()
        {
            Services = new ServiceCollection()
                .AddLogging()
                .AddTransient<TService>();
        }
    }

    public class ServiceTestsBase<TService, TDbContext> : ServiceTestsBase<TService>
        where TService : class
        where TDbContext : ProjectDbContext
    {
        protected TDbContext Db => Provider.GetService<TDbContext>();

        public IServiceCollection AddDbContext([CallerMemberName] string testName = null)
        {
            return Services.AddDbContext<TDbContext>(x => x.UseInMemoryDatabase($"{GetType().Name}_{testName}"));
        }
    }
}
