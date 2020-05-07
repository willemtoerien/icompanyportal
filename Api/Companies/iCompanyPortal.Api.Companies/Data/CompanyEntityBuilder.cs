using iCompanyPortal.Api.Companies.Client;
using iCompanyPortal.Api.Shared.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Data
{
    public class CompanyEntityBuilder : EntityBuilder
    {
        public override Type Type => typeof(Company);

        public override void Build(EntityTypeBuilder builder)
        {
            builder.ToTable("Companies");

            builder.HasKey(nameof(Company.CompanyId));

            builder.Property(nameof(Company.CompanyId))
                .UseIdentityColumn();

            builder.Property(nameof(Company.Name))
                .HasMaxLength(300)
                .IsRequired();

            builder.Property(nameof(Company.UniqueName))
                .HasMaxLength(100)
                .IsRequired();

            builder.HasIndex(nameof(Company.UniqueName))
                .IsUnique();

            builder.Property(nameof(Company.Status));

            builder.Property(nameof(Company.CreatedAt));

            builder.Property(nameof(Company.DeleteAt));
        }
    }
}
