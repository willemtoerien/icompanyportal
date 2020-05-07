using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace System.Net.Http
{
    public static class HttpResponseMessageExtensions
    {
        public static async Task<T> GetBodyAsync<T>(this HttpResponseMessage response)
        {
            var bodyStr = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<T>(bodyStr);
        }
    }
}
