using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Client
{
    public interface ICompaniesClient
    {
        Task<int> Create(SaveCompanyRequest request);
        Task Delete(int companyId);
        Task<Company[]> GetCompanies(int pageSize, int page, string search = "");
        Task<Company[]> GetFavorites();
        Task<Company> GetCompany(int companyId);
        Task<bool> IsUniqueNameUnique(string uniqueName);
        Task Save(int companyId, SaveCompanyRequest request);
    }
}