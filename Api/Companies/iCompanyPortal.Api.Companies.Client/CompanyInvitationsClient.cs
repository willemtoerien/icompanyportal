﻿using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Client
{
    public class CompanyInvitationsClient : ICompanyInvitationsClient
    {
        private readonly HttpClient http;

        public CompanyInvitationsClient(HttpClient http)
        {
            this.http = http;
        }

        public async Task<CompanyInvitation[]> GetInvitationsAsync(int companyId)
        {
            return await http.GetAsync<CompanyInvitation[]>($"/{companyId}/all");
        }

        public async Task<CompanyInvitation> GetAsync(Guid token)
        {
            return await http.GetAsync<CompanyInvitation>($"/{token}");
        }

        public async Task InviteAsync(int companyId, string responseUrl, CompanyInvitationRequest request)
        {
            await http.PostAsync($"/{companyId}/{WebUtility.UrlEncode(responseUrl)}", request);
        }

        public async Task RespondAsync(Guid token, bool accepted)
        {
            await http.PutAsync($"/{token}/{accepted}");
        }

        public async Task<bool> ActivateAsync(string email, int userId)
        {
            return await http.PutAsync<bool>($"/{email}/{userId}/activate");
        }

        public async Task DeleteAsync(Guid token)
        {
            await http.DeleteAsync($"/{token}");
        }
    }
}
