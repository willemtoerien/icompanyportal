using Microsoft.AspNetCore.Http;
using System;

namespace iCompanyPortal.Api.Users.Shared
{
    public class Authenticator : IAuthenticator
    {
        private readonly TokenProvider tokenProvider;

        public Authenticator(TokenProvider tokenProvider)
        {
            this.tokenProvider = tokenProvider;
        }

        public void Authenticate(HttpResponse response, int userId)
        {
            var token = tokenProvider.Provide(userId);
            if (response.Headers.ContainsKey("Authorization"))
            {
                return;
            }
            response.Headers.Add("Access-Control-Expose-Headers", "Authorization");
            response.Headers.Add("Authorization", $"Bearer {token}");
        }
    }
}
