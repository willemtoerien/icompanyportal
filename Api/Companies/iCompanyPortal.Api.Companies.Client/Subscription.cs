using System;
using System.Collections.Generic;
using System.Text;

namespace iCompanyPortal.Api.Companies.Client
{
    public class Subscription
    {
        public int CompanyId { get; set; }

        public SubscriptionPlanType Type { get; set; }

        public SubscriptionLength Length { get; set; }

        public string CurrencyCode { get; set; }

        public DateTime SubscribedOn { get; set; }

        public DateTime ExpiresOn { get; set; }

        public SubscriptionStatus Status { get; set; }

        public Company Company { get; set; }

        public SubscriptionPlan SubscriptionPlan { get; set; }
    }
}
