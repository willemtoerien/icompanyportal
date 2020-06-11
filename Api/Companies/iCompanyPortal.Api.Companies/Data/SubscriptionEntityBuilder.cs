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
    public class SubscriptionEntityBuilder : EntityBuilder
    {
        public override Type Type => typeof(Subscription);

        public override void Build(EntityTypeBuilder builder)
        {
            builder.ToTable("Subscriptions");

            builder.HasKey(nameof(Subscription.CompanyId));

            builder.Property(nameof(Subscription.CompanyId));

            builder.Property(nameof(Subscription.CurrencyCode))
                .HasMaxLength(3)
                .IsRequired();

            builder.Property(nameof(Subscription.Length));

            builder.Property(nameof(Subscription.Type));

            builder.Property(nameof(Subscription.ExpiresOn));

            builder.Property(nameof(Subscription.Status));

            builder.Property(nameof(Subscription.SubscribedOn));

            builder.HasOne(nameof(Subscription.SubscriptionPlan))
                .WithMany(nameof(SubscriptionPlan.Subscriptions))
                .HasForeignKey(nameof(Subscription.CurrencyCode), nameof(Subscription.Length), nameof(Subscription.Type));

            builder.HasOne(nameof(Subscription.Company))
                .WithOne(nameof(Company.Subscription))
                .HasForeignKey(typeof(Subscription), nameof(Subscription.CompanyId))
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
