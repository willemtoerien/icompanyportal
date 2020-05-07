using System;
using System.ComponentModel.DataAnnotations;

namespace iCompanyPortal.Api.Notifications.Client
{
    public class NotifyRequest
    {
        [Required]
        public string Subject { get; set; }

        [Required]
        public string Message { get; set; }
    }
}
