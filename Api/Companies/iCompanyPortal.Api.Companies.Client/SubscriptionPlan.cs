using System;
using System.Collections.Generic;
using System.Text;

namespace iCompanyPortal.Api.Companies.Client
{
    public class SubscriptionPlan
    {
        public SubscriptionPlanType Type { get; set; }

        public SubscriptionLength Length { get; set; }

        public string CurrencyCode { get; set; }

        public decimal Amount { get; set; }

        public ICollection<Subscription> Subscriptions { get; set; }
    }
}
