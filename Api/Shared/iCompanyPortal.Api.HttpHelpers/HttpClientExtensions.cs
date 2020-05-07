using iCompanyPortal.Api.HttpHelpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace System.Net.Http
{
    public static class HttpClientExtensions
    {
        private static async Task<HttpResponseMessage> SendAsync(this HttpClient http, HttpMethod method, string requestUri, object model = null)
        {
            var request = new HttpRequestMessage();
            requestUri = requestUri.Substring(1);
            if (requestUri.Length > 0)
            {
                request.RequestUri = new Uri(requestUri);
            }
            request.Method = method;
            if (model != null)
            {
                request.Content = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
            }
            var response = await http.SendAsync(request);
            if (!response.IsSuccessStatusCode)
            {
                throw new ApiException(response);
            }
            return response;
        }

        public static async Task<HttpResponseMessage> PostAsync(this HttpClient http, string requestUri, object model = null)
        {
            return await http.SendAsync(HttpMethod.Post, requestUri, model);
        }

        public static async Task<T> PostAsync<T>(this HttpClient http, string requestUri, object model = null)
        {
            var response = await http.SendAsync(HttpMethod.Post, requestUri, model);
            return await response.GetBodyAsync<T>();
        }

        public static async Task PutAsync(this HttpClient http, string requestUri, object model = null)
        {
            await http.SendAsync(HttpMethod.Put, requestUri, model);
        }

        public static async Task<T> PutAsync<T>(this HttpClient http, string requestUri, object model = null)
        {
            var response = await http.SendAsync(HttpMethod.Put, requestUri, model);
            return await response.GetBodyAsync<T>();
        }

        public static async Task GetAsync(this HttpClient http, string requestUri)
        {
            await http.SendAsync(HttpMethod.Put, requestUri);
        }

        public static async Task<T> GetAsync<T>(this HttpClient http, string requestUri, object model = null)
        {
            var response = await http.SendAsync(HttpMethod.Get, requestUri);
            return await response.GetBodyAsync<T>();
        }

        public static async Task DeleteAsync(this HttpClient http, string requestUri)
        {
            await http.SendAsync(HttpMethod.Put, requestUri);
        }
    }
}
