using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Text;

namespace System.Security.Claims
{
    public static class ClaimsPrincipalExtensions
    {
        private const string NotAuthenticated = "Principal's identity is not authenticated";
        private const string NoClaims = "The principal's identity has no name claims.";
        private const string InvalidClaimValue = "The pricinipal's value provided is invalid.";

        public static int GetUserId(this ClaimsPrincipal principal)
        {
            if (principal == null)
            {
                throw new ArgumentNullException(nameof(principal));
            }

            if (!principal.Identity.IsAuthenticated)
            {
                throw new AuthenticationException(NotAuthenticated);
            }

            var identity = (ClaimsIdentity)principal.Identity;
            var claim = identity.Claims.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            if (claim == null)
            {
                throw new AuthenticationException(NoClaims);
            }

            if (!int.TryParse(claim.Value, out var userId))
            {
                throw new AuthenticationException(InvalidClaimValue);
            }

            return userId;
        }
    }
}
