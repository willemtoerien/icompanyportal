using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace iCompanyPortal.Api.Users.Client
{
    public class SignInRequest : ResetPasswordRequest
    {
        [Required(ErrorMessage = "{0} is required.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
