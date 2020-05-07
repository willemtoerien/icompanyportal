using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace iCompanyPortal.Api.Users.Client
{
    public class ResetPasswordRequest
    {
        [Required(ErrorMessage = "{0} is required.")]
        [EmailAddress(ErrorMessage = "{0} must be an email address.")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }
}
