using System;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Client
{
    public interface ICompanyInvitationsClient
    {
        Task Delete(Guid token);
        Task<CompanyInvitation[]> GetInvitationsAsync(int companyId);
        Task<CompanyInvitation> Get(Guid token);
        Task InviteAsync(int companyId, string responseUrl, CompanyInvitationRequest request);
        Task Respond(Guid token, bool accepted);
    }
}