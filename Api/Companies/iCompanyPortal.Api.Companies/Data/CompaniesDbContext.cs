using iCompanyPortal.Api.Companies.Client;
using iCompanyPortal.Api.Shared.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Data
{
    public class CompaniesDbContext : ProjectDbContext
    {
        public DbSet<Company> Companies { get; set; }

        public DbSet<CompanyInvitation> CompanyInvitations { get; set; }

        public DbSet<CompanyUser> CompanyUsers { get; set; }

        public DbSet<CompanyUserPermission> CompanyUserPermissions { get; set; }

        public CompaniesDbContext(DbContextOptions options, IEnumerable<EntityBuilder> builders) : base(options, builders)
        {
        }
    }
}
