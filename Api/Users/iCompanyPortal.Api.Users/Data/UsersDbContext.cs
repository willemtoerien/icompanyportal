using iCompanyPortal.Api.Shared.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Users.Data
{
    public class UsersDbContext : ProjectDbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<ConfirmationToken> ConfirmationTokens { get; set; }

        public UsersDbContext(DbContextOptions options, IEnumerable<EntityBuilder> builders) : base(options, builders)
        {
        }
    }
}
