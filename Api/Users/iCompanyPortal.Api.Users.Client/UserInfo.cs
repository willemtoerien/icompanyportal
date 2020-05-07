using System;
using System.Collections.Generic;
using System.Text;

namespace iCompanyPortal.Api.Users.Client
{
    public class UserInfo
    {
        public int UserId { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public UserStatus Status { get; set; }

        public DateTime? DeleteAt { get; set; }
    }
}
