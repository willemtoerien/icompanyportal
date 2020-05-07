using iCompanyPortal.Api.Notifications.Client;
using iCompanyPortal.Api.Shared.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Notifications.Data
{
    public class NotificationsDbContext : ProjectDbContext
    {
        public DbSet<Notification> Notifications { get; set; }

        public NotificationsDbContext(DbContextOptions options, IEnumerable<EntityBuilder> builders) : base(options, builders)
        {
        }
    }
}
