using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Emailing.Client
{
    public class EmailingClient : IEmailingClient
    {
        private readonly HttpClient http;

        public EmailingClient(HttpClient http)
        {
            this.http = http;
        }

        public async Task SendAsync(EmailRequest request)
        {
            await http.PostAsync("/", request);
        }
    }
}
