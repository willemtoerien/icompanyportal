using iCompanyPortal.Api.Shared.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Users.Data
{
    public class ConfirmationTokenEntityBuilder : EntityBuilder
    {
        public override Type Type => typeof(ConfirmationToken);

        public override void Build(EntityTypeBuilder builder)
        {
            builder.ToTable("ConfirmationTokens");

            builder.HasKey(nameof(ConfirmationToken.UserId), nameof(ConfirmationToken.Type));

            builder.Property(nameof(ConfirmationToken.UserId));

            builder.Property(nameof(ConfirmationToken.Type));

            builder.HasIndex(nameof(ConfirmationToken.Type), nameof(ConfirmationToken.Value))
                .IsUnique();

            builder.Property(nameof(ConfirmationToken.Value));

            builder.HasOne(nameof(ConfirmationToken.User))
                .WithMany(nameof(User.ConfirmationTokens))
                .HasForeignKey(nameof(ConfirmationToken.UserId))
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
