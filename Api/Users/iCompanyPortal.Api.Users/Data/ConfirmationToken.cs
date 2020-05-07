using iCompanyPortal.Api.Users.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Users.Data
{
    public class ConfirmationToken
    {
        public int UserId { get; set; }

        public ConfirmationTokenType Type { get; set; }

        public Guid Value { get; set; }

        public User User { get; set; }
    }
}
