using System;
using System.Collections.Generic;
using System.Text;

namespace iCompanyPortal.Api.Companies.Client
{
    public class CompanyInvitation
    {
        public Guid Token { get; set; }

        public int CompanyId { get; set; }

        public string Email { get; set; }

        public InvitationStatus Status { get; set; }

        public string Permissions { get; set; }

        public Company Company { get; set; }
    }
}
