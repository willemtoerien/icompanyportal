using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace iCompanyPortal.Api.Emailing.Client
{
    public class EmailRequest
    {
        [Required]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        public string To { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string TemplateKey { get; set; }

        public Dictionary<string, string> Data { get; set; }
    }
}
