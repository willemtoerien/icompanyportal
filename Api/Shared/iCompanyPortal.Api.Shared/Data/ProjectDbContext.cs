using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace iCompanyPortal.Api.Shared.Data
{
    public abstract class ProjectDbContext : DbContext
    {
        private readonly IEnumerable<EntityBuilder> builders;

        public ProjectDbContext(DbContextOptions options, IEnumerable<EntityBuilder> builders)
            : base(options)
        {
            this.builders = builders;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            foreach (var builder in builders)
            {
                modelBuilder.Entity(builder.Type, x => builder.Build(x));
            }
        }
    }
}
