using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace iCompanyPortal.Api.Companies.Client
{
    public class CompanyInvitationRequest
    {
        [Required]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        public int[] Permissions { get; set; }
    }
}
