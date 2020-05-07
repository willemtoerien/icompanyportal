using iCompanyPortal.Api.Emailing.Client;
using iCompanyPortal.Api.Shared.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Emailing.Data
{
    public class EmailEntityBuilder : EntityBuilder
    {
        public override Type Type => typeof(Email);

        public override void Build(EntityTypeBuilder builder)
        {
            builder.ToTable("Emails");

            builder.HasKey(nameof(Email.EmailId));

            builder.Property(nameof(Email.EmailId))
                .UseIdentityColumn();

            builder.Property(nameof(Email.Body));

            builder.Property(nameof(Email.CreatedAt));

            builder.Property(nameof(Email.Data));

            builder.Property(nameof(Email.ErrorMessage));

            builder.Property(nameof(Email.SentAt));

            builder.Property(nameof(Email.Subject))
                .IsRequired()
                .HasMaxLength(300);

            builder.Property(nameof(Email.TemplateKey))
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(nameof(Email.To))
                .IsRequired()
                .HasMaxLength(300);
        }
    }
}
