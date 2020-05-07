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
    public class CompanyUserEntityBuilder : EntityBuilder
    {
        public override Type Type => typeof(CompanyUser);

        public override void Build(EntityTypeBuilder builder)
        {
            builder.ToTable("CompanyUsers");

            builder.HasKey(nameof(CompanyUser.CompanyId), nameof(CompanyUser.UserId));

            builder.Property(nameof(CompanyUser.CompanyId));

            builder.Property(nameof(CompanyUser.UserId));

            builder.Property(nameof(CompanyUser.IsFavorite));

            builder.HasOne(nameof(CompanyUser.Company))
                .WithMany(nameof(Company.CompanyUsers))
                .HasForeignKey(nameof(CompanyUser.CompanyId))
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
