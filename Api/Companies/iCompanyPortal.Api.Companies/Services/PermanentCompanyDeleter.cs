using iCompanyPortal.Api.Companies.Data;
using iCompanyPortal.Api.Shared.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Services
{
    public class PermanentCompanyDeleter : HostedServiceTimer
    {
        public PermanentCompanyDeleter(IServiceScopeFactory scopeFactory)
            : base(scopeFactory)
        {
        }
        
        public override async Task OnIntervalAsync()
        {
            using var scope = ScopeFactory.CreateScope();
            var db = scope.ServiceProvider.GetService<CompaniesDbContext>();
            if (!await db.Database.CanConnectAsync())
            {
                return;
            }
            db.RemoveRange(db.Companies.Where(x => x.DeleteAt <= DateTime.Today));
            await db.SaveChangesAsync();
        }
    }
}
