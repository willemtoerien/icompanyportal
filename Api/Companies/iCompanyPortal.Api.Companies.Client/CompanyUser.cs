using System;
using System.Collections.Generic;
using System.Text;

namespace iCompanyPortal.Api.Companies.Client
{
    public class CompanyUser
    {
        public int CompanyId { get; set; }

        public int UserId { get; set; }

        public bool IsFavorite { get; set; }

        public Company Company { get; set; }

        public ICollection<CompanyUserPermission> CompanyUserPermissions { get; set; } = new HashSet<CompanyUserPermission>();
    }
}
