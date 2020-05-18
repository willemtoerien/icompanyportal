using iCompanyPortal.Api.Notifications.Client;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Client
{
    public class CompanyUsersClient : ICompanyUsersClient
    {
        private readonly HttpClient http;

        public CompanyUsersClient(HttpClient http)
        {
            this.http = http;
        }

        public async Task<CompanyUser> GetAsync(int companyId)
        {
            return await http.GetAsync<CompanyUser>($"/{companyId}");
        }

        public async Task<CompanyUser[]> GetAllAsync(int companyId)
        {
            return await http.GetAsync<CompanyUser[]>($"/{companyId}/all");
        }

        public async Task NotifyAsync(int companyId, NotifyRequest request)
        {
            await http.PostAsync($"/{companyId}/notify", request);
        }

        public async Task DeleteAsync(int companyId, int userId)
        {
            await http.DeleteAsync($"/{companyId}/{userId}");
        }
    }
}
