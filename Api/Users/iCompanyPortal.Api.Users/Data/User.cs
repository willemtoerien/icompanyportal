using iCompanyPortal.Api.Users.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Users.Data
{
    public class User
    {
        public int UserId { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Password { get; set; }

        public UserStatus Status { get; set; }

        public DateTime? DeleteAt { get; set; }

        public HashSet<ConfirmationToken> ConfirmationTokens { get; set; } = new HashSet<ConfirmationToken>();
    }
}
