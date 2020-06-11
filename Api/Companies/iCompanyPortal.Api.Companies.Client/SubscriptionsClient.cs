using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Client
{
    public class SubscriptionsClient : ISubscriptionsClient
    {
        private readonly HttpClient http;

        public SubscriptionsClient(HttpClient http)
        {
            this.http = http;
        }

        public async Task<Subscription> GetAsync(int companyId)
        {
            return await http.GetAsync<Subscription>($"/{companyId}");
        }

        public async Task SubscribeAsync(int companyId, SubscriptionRequest request)
        {
            await http.PostAsync($"/{companyId}", request);
        }

        public async Task CancelAsync(int companyId)
        {
            await http.DeleteAsync($"/{companyId}");
        }
    }
}
