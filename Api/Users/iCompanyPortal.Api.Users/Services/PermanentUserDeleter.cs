using iCompanyPortal.Api.Shared.Services;
using iCompanyPortal.Api.Users.Data;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Users.Services
{
    public class PermanentUserDeleter : HostedServiceTimer
    {
        public PermanentUserDeleter(IServiceScopeFactory scopeFactory)
            : base(scopeFactory)
        {
        }
        
        public override async Task OnIntervalAsync()
        {
            using var scope = ScopeFactory.CreateScope();
            var db = scope.ServiceProvider.GetService<UsersDbContext>();
            db.RemoveRange(db.Users.Where(x => x.DeleteAt <= DateTime.Today));
            await db.SaveChangesAsync();
        }
    }
}
