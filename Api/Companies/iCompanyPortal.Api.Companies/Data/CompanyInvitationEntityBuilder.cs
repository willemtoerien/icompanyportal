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
    public class CompanyInvitationEntityBuilder : EntityBuilder
    {
        public override Type Type => typeof(CompanyInvitation);

        public override void Build(EntityTypeBuilder builder)
        {
            builder.ToTable("CompanyInvitations");

            builder.HasKey(nameof(CompanyInvitation.Token));

            builder.Property(nameof(CompanyInvitation.Token));

            builder.HasIndex(nameof(CompanyInvitation.CompanyId), nameof(CompanyInvitation.Email))
                .IsUnique();

            builder.Property(nameof(CompanyInvitation.CompanyId));

            builder.Property(nameof(CompanyInvitation.Email))
                .HasMaxLength(300)
                .IsRequired();

            builder.Property(nameof(CompanyInvitation.Status));

            builder.Property(nameof(CompanyInvitation.Permissions))
                .HasMaxLength(300)
                .IsRequired();

            builder.HasOne(nameof(CompanyInvitation.Company))
                .WithMany(nameof(Company.CompanyInvitations))
                .HasForeignKey(nameof(CompanyInvitation.CompanyId))
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
