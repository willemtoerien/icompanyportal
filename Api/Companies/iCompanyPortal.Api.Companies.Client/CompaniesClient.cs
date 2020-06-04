using iCompanyPortal.Api.HttpHelpers;
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

        public async Task<bool> IsUniqueNameUniqueAsync(string uniqueName)
        {
            return await http.GetAsync<bool>($"/{WebUtility.UrlEncode(uniqueName)}/is-unique");
        }

        public async Task<Company[]> GetCompaniesAsync(GetQuery getQuery)
        {
            return await http.GetAsync<Company[]>($"/{getQuery.ToQueryParams()}");
        }

        public async Task<Company[]> GetFavoritesAsync()
        {
            return await http.GetAsync<Company[]>($"/favorites");
        }

        public async Task<Company> GetCompanyAsync(int companyId)
        {
            return await http.GetAsync<Company>($"/{companyId}");
        }

        public async Task<int> CreateAsync(SaveCompanyRequest request)
        {
            return await http.PostAsync<int>("/", request);
        }

        public async Task SaveAsync(int companyId, SaveCompanyRequest request)
        {
            await http.PutAsync($"/{companyId}", request);
        }

        public async Task SetFavoriteAsync(int companyId, bool? value)
        {
            if (value.HasValue)
            {
                await http.PutAsync($"/{companyId}/favorite/{value}");
            } else
            {
                await http.PutAsync($"/{companyId}/favorite");
            }
        }

        public async Task DeleteAsync(int companyId)
        {
            await http.DeleteAsync($"/{companyId}");
        }
    }
}
