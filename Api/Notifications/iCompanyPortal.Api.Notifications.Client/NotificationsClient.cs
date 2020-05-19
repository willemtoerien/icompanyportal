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

        public async Task<Notification[]> GetNotifications()
        {
            return await http.GetAsync<Notification[]>($"/");
        }

        public async Task<int> GetCount(int userId)
        {
            return await http.GetAsync<int>($"/count");
        }

        public async Task<int> Notify(int userId, NotifyRequest request)
        {
            return await http.PostAsync<int>($"/{userId}", request);
        }

        public async Task MarkAllAsRead()
        {
            await http.PutAsync($"/");
        }
    }
}
