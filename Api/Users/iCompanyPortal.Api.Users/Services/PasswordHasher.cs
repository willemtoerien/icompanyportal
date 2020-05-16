using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Users.Services
{
    public class PasswordHasher
    {
        private readonly IOptions<UsersSettings> options;

        public PasswordHasher(IOptions<UsersSettings> options)
        {
            this.options = options;
        }

        public string Hash(string password)
        {
            var valueBytes = KeyDerivation.Pbkdf2(
                password,
                Encoding.UTF8.GetBytes(options.Value.HashSalt),
                KeyDerivationPrf.HMACSHA512,
                10000,
                256 / 8);
            return Convert.ToBase64String(valueBytes);
        }

        public bool Verify(string hashedPassword, string password)
        {
            return Hash(password) == hashedPassword;
        }
    }
}
