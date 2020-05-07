using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Emailing.Services
{
    public class LocalTemplator : ITemplator
    {
        private readonly Dictionary<string, string> templates = new Dictionary<string, string>
        {
            ["EmailConfirmation"] = "Please click on the following URL to confirm your email: {{ ResponseUrl }}",
            ["CompanyInvitation"] = "You have been invited to join the company {{ CompanyName }}. Please click on the following URL to accept or reject the invitation: {{ ResponseUrl }}"
        };

        public Task<string> CompileAsync(string key, Dictionary<string, string> data = null)
        {
            var body = templates[key];
            foreach (var entry in data)
            {
                body = body.Replace("{{ " + entry.Key + " }}", entry.Value);
            }
            return Task.FromResult(body);
        }
    }
}
