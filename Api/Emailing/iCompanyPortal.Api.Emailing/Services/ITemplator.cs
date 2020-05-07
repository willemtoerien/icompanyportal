using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Emailing.Services
{
    public interface ITemplator
    {
        public Task<string> CompileAsync(string key, Dictionary<string, string> data = null);
    }
}
