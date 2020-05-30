using System;
using System.Collections.Generic;
using System.Text;

namespace iCompanyPortal.Api.Companies.Client
{
    public class CompanyUserPermission
    {
        public CompanyUserPermissionType Type { get; set; }

        public int CompanyId { get; set; }

        public int UserId { get; set; }

        public bool IsSet { get; set; }

        public CompanyUser CompanyUser { get; set; }
    }
}
