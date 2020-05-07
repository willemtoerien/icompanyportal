using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace iCompanyPortal.Api.Companies.Client
{
    public class SaveCompanyRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string UniqueName { get; set; }
    }
}
