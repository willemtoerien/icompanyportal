using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace iCompanyPortal.Api.Users.Client
{
    public class SignUpRequest : SignInRequest
    {
        [Required(ErrorMessage = "{0} is required.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "{0} is required.")]
        public string LastName { get; set; }
    }
}
