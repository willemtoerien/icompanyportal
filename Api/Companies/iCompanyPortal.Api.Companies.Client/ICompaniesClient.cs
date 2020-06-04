using iCompanyPortal.Api.HttpHelpers;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Client
{
    public interface ICompaniesClient
    {
        Task<int> CreateAsync(SaveCompanyRequest request);
        Task DeleteAsync(int companyId);
        Task<Company[]> GetCompaniesAsync(GetQuery getQuery);
        Task<Company[]> GetFavoritesAsync();
        Task<Company> GetCompanyAsync(int companyId);
        Task<bool> IsUniqueNameUniqueAsync(string uniqueName);
        Task SaveAsync(int companyId, SaveCompanyRequest request);
        Task SetFavoriteAsync(int companyId, bool? value);
    }
}