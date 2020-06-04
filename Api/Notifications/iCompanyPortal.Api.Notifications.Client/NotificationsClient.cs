using iCompanyPortal.Api.HttpHelpers;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Notifications.Client
{
    public class NotificationsClient : INotificationsClient
    {
        private readonly HttpClient http;

        public NotificationsClient(HttpClient http)
        {
            this.http = http;
        }

        public async Task<Notification[]> GetNotificationsAsync(GetQuery getQuery)
        {
            return await http.GetAsync<Notification[]>($"/{getQuery.ToQueryParams()}");
        }

        public async Task<int> GetUnreadCountAsync(int userId)
        {
            return await http.GetAsync<int>($"/count");
        }

        public async Task<int> NotifyAsync(int userId, NotifyRequest request)
        {
            return await http.PostAsync<int>($"/{userId}", request);
        }

        public async Task MarkAllAsReadAsync()
        {
            await http.PutAsync($"/");
        }
    }
}
