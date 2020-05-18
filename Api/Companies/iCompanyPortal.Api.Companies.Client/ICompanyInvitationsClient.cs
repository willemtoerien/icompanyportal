using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Client
{
    public interface ICompanyInvitationsClient
    {
        Task DeleteAsync(Guid token);
        Task<CompanyInvitation[]> GetInvitationsAsync(int companyId);
        Task<CompanyInvitation> GetAsync(Guid token);
        Task InviteAsync(int companyId, string responseUrl, CompanyInvitationRequest request);
        Task RespondAsync(Guid token, bool accepted);
        Task<bool> ActivateAsync(string email, int userId);
    }
}