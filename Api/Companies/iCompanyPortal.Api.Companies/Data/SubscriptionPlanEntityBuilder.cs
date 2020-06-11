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
    public class SubscriptionPlanEntityBuilder : EntityBuilder
    {
        public override Type Type => typeof(SubscriptionPlan);

        public override void Build(EntityTypeBuilder builder)
        {
            builder.ToTable("SubscriptionPlans");

            builder.HasKey(nameof(SubscriptionPlan.CurrencyCode), nameof(SubscriptionPlan.Length), nameof(SubscriptionPlan.Type));

            builder.Property(nameof(SubscriptionPlan.Amount))
                .HasColumnType("DECIMAL(18, 2)");

            builder.Property(nameof(SubscriptionPlan.CurrencyCode))
                .HasMaxLength(3)
                .IsRequired();

            builder.Property(nameof(SubscriptionPlan.Length));

            builder.Property(nameof(SubscriptionPlan.Type));

            builder.HasData(Create("USD", 0, 9.99M, 29.99M, 49.99M, 199.99M));
        }

        private static IEnumerable<SubscriptionPlan> Create(string currencyCode, params decimal[] amounts)
        {
            for (int i = 0; i < 4; i++)
            {
                yield return new SubscriptionPlan
                {
                    Amount = amounts[i],
                    CurrencyCode = currencyCode,
                    Length = SubscriptionLength.Monthly,
                    Type = (SubscriptionPlanType)i
                };
            }
            for (int i = 0; i < 4; i++)
            {
                yield return new SubscriptionPlan
                {
                    Amount = amounts[i] - (amounts[i] * 0.1M),
                    CurrencyCode = currencyCode,
                    Length = SubscriptionLength.Annually,
                    Type = (SubscriptionPlanType)i
                };
            }
        }
    }
}
