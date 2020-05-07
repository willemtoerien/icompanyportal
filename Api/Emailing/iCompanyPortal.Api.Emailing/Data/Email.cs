using System;
using System.Collections.Generic;
using System.Text;

namespace iCompanyPortal.Api.Emailing.Client
{
    public class Email
    {
        public int EmailId { get; set; }
        
        public string To { get; set; }

        public string Subject { get; set; }

        public string TemplateKey { get; set; }

        public string Data { get; set; }

        public string Body { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? SentAt { get; set; }

        public string ErrorMessage { get; set; }
    }
}
