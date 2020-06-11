using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Client
{
    public class CompanyUserPermissionsClient : ICompanyUserPermissionsClient
    {
        private readonly HttpClient http;

        public CompanyUserPermissionsClient(HttpClient http)
        {
            this.http = http;
        }

        public async Task<bool> HasPermission(int companyId, int userId, CompanyUserPermissionType permissionType)
        {
            return await http.GetAsync<bool>($"/{companyId}/{userId}/{permissionType}");
        }

        public async Task SetPermission(int companyId, int userId, CompanyUserPermissionType permissionType, bool isSet)
        {
            await http.PutAsync($"/{companyId}/{userId}/{permissionType}/{isSet}");
        }
    }
}
