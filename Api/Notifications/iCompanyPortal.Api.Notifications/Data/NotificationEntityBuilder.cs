using iCompanyPortal.Api.Notifications.Client;
using iCompanyPortal.Api.Shared.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Notifications.Data
{
    public class NotificationEntityBuilder : EntityBuilder
    {
        public override Type Type => typeof(Notification);

        public override void Build(EntityTypeBuilder builder)
        {
            builder.ToTable("Notifications");

            builder.HasKey(nameof(Notification.NotificationId));

            builder.Property(nameof(Notification.NotificationId))
                .UseIdentityColumn();

            builder.Property(nameof(Notification.CreatedAt));

            builder.Property(nameof(Notification.Message))
                .IsRequired();

            builder.Property(nameof(Notification.ReadAt));

            builder.Property(nameof(Notification.Subject))
                .HasMaxLength(300)
                .IsRequired();

            builder.Property(nameof(Notification.UserId));
        }
    }
}
