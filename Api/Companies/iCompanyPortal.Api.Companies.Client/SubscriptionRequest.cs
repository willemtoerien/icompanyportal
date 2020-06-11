using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace iCompanyPortal.Api.Companies.Client
{
    public class SubscriptionRequest
    {
        [Required]
        public SubscriptionPlanType Type { get; set; }

        [Required]
        public SubscriptionLength Length { get; set; }

        [Required]
        [MaxLength(3)]
        public string CurrencyCode { get; set; }
    }
}
