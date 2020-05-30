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
    public class CompanyUserPermissionEntityBuilder : EntityBuilder
    {
        public override Type Type => typeof(CompanyUserPermission);

        public override void Build(EntityTypeBuilder builder)
        {
            builder.ToTable("CompanyUserPermissions");

            builder.HasKey(nameof(CompanyUserPermission.Type), nameof(CompanyUserPermission.CompanyId), nameof(CompanyUserPermission.UserId));

            builder.Property(nameof(CompanyUserPermission.Type));

            builder.Property(nameof(CompanyUserPermission.CompanyId));

            builder.Property(nameof(CompanyUserPermission.UserId));

            builder.Property(nameof(CompanyUserPermission.IsSet));

            builder.HasOne(nameof(CompanyUserPermission.CompanyUser))
                .WithMany(nameof(CompanyUser.CompanyUserPermissions))
                .HasForeignKey(nameof(CompanyUser.CompanyId), nameof(CompanyUser.UserId))
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
