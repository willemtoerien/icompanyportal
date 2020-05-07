using Microsoft.AspNetCore.Http;

namespace iCompanyPortal.Api.Users.Shared
{
    public interface IAuthenticator
    {
        void Authenticate(HttpResponse response, int userId);
    }
}