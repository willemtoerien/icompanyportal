using iCompanyPortal.Api.Emailing.Client;
using iCompanyPortal.Api.Shared.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Emailing.Data
{
    public class EmailingDbContext : ProjectDbContext
    {
        public DbSet<Email> Emails { get; set; }

        public EmailingDbContext(DbContextOptions options, IEnumerable<EntityBuilder> builders) : base(options, builders)
        {
        }
    }
}
