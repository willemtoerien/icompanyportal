using System;
using System.Collections.Generic;

namespace iCompanyPortal.Api.Companies.Client
{
    public class Company
    {
        public int CompanyId { get; set; }

        public string Name { get; set; }

        public string UniqueName { get; set; }

        public CompanyStatus Status { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? DeleteAt { get; set; }

        public byte[] Logo { get; set; }

        public string LogoContentType { get; set; }

        public ICollection<CompanyInvitation> CompanyInvitations { get; set; } = new HashSet<CompanyInvitation>();

        public ICollection<CompanyUser> CompanyUsers { get; set; } = new HashSet<CompanyUser>();

        public Subscription Subscription { get; set; }
    }
}
