using System;
using System.ComponentModel.DataAnnotations;

namespace iCompanyPortal.Api.Notifications.Client
{
    public class NotifyRequest
    {
        public string RedirectPath { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string Body { get; set; }
    }
}
