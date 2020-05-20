using iCompanyPortal.Api.Shared.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Users.Data
{
    public class UserEntityBuilder : EntityBuilder
    {
        public override Type Type => typeof(User);

        public override void Build(EntityTypeBuilder builder)
        {
            builder.ToTable("Users");

            builder.HasKey(nameof(User.UserId));

            builder.Property(nameof(User.UserId))
                .UseIdentityColumn();

            builder.Property(nameof(User.Email))
                .IsRequired()
                .HasMaxLength(300);

            builder.HasIndex(nameof(User.Email))
                .IsUnique();

            builder.Property(nameof(User.FirstName))
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(nameof(User.LastName))
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(nameof(User.Password))
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(nameof(User.Avatar));

            builder.Property(nameof(User.AvatarContentType))
                .HasMaxLength(100);

            builder.Property(nameof(User.Status));

            builder.Property(nameof(User.DeleteAt));
        }
    }
}
