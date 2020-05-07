using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Client
{
    public class CompaniesClient : ICompaniesClient
    {
        private readonly HttpClient http;

        public CompaniesClient(HttpClient http)
        {
            this.http = http;
        }

        public async Task<bool> IsUniqueNameUnique(string uniqueName)
        {
            return await http.GetAsync<bool>($"/{WebUtility.UrlEncode(uniqueName)}/is-unique");
        }

        public async Task<Company[]> GetCompanies(int pageSize, int page, string search = "")
        {
            return await http.GetAsync<Company[]>($"/{pageSize}/{page}?search=${WebUtility.UrlEncode(search)}");
        }

        public async Task<Company[]> GetFavorites()
        {
            return await http.GetAsync<Company[]>($"/favorites");
        }

        public async Task<Company> GetCompany(int companyId)
        {
            return await http.GetAsync<Company>($"/{companyId}");
        }

        public async Task<int> Create(SaveCompanyRequest request)
        {
            return await http.PostAsync<int>("/", request);
        }

        public async Task Save(int companyId, SaveCompanyRequest request)
        {
            await http.PutAsync($"/{companyId}", request);
        }

        public async Task Delete(int companyId)
        {
            await http.DeleteAsync($"/{companyId}");
        }
    }
}
