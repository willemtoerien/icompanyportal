using iCompanyPortal.Api.Notifications.Client;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Client
{
    public interface ICompanyUsersClient
    {
        Task DeleteAsync(int companyId, int userId);
        Task<CompanyUser[]> GetAllAsync(int companyId);
        Task<CompanyUser> GetAsync(int companyId);
        Task NotifyAsync(int companyId, NotifyRequest request);
    }
}