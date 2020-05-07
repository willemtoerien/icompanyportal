﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Emailing.Services
{
    public class EmailSettings
    {
        public bool IsEnabled { get; set; }

        public string Host { get; set; }

        public int Port { get; set; }

        public bool EnableSsl { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string From { get; set; }
    }
}
