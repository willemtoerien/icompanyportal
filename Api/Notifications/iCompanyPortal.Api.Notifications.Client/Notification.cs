using System;
using System.Collections.Generic;
using System.Text;

namespace iCompanyPortal.Api.Notifications.Client
{
    public class Notification
    {
        public int NotificationId { get; set; }

        public int UserId { get; set; }

        public string RedirectPath { get; set; }

        public string Subject { get; set; }

        public string Body { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? ReadAt { get; set; }
    }
}
