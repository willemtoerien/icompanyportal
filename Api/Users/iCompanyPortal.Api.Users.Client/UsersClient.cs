using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Users.Client
{
    public class UsersClient : IUsersClient
    {
        private readonly HttpClient http;

        public UsersClient(HttpClient http)
        {
            this.http = http;
        }

        public async Task<bool> DoesUserExistAsync(int userId)
        {
            return await http.GetAsync<bool>($"/{userId}/exists");
        }

        public async Task<bool> IsEmailUniqueAsync(string email)
        {
            return await http.GetAsync<bool>($"/{WebUtility.UrlEncode(email)}/is-unique");
        }

        public async Task<UserInfo> GetSignedInUserAsync()
        {
            return await http.GetAsync<UserInfo>("/");
        }

        public async Task<UserInfo> GetUserAsync(int userId)
        {
            return await http.GetAsync<UserInfo>($"/{userId}");
        }

        public async Task<UserInfo[]> GetUsersAsync(string userIds)
        {
            return await http.GetAsync<UserInfo[]>($"/users/${userIds}");
        }

        public async Task<UserInfo> GetUserByEmailAsync(string email)
        {
            return await http.GetAsync<UserInfo>($"/by-email/{WebUtility.UrlEncode(email)}");
        }

        public async Task ResetPasswordAsync(string responseUrl, ResetPasswordRequest request)
        {
            await http.PutAsync($"/reset-password/{WebUtility.UrlEncode(responseUrl)}", request);
        }

        public async Task SignInAsync(SignInRequest request)
        {
            await http.PutAsync($"/sign-in", request);
        }

        public async Task SaveAsync(string responseUrl, SaveUserRequest request)
        {
            await http.PutAsync($"/{WebUtility.UrlEncode(responseUrl)}", request);
        }

        public async Task ConfirmAsync(ConfirmationTokenType type, Guid value)
        {
            await http.PutAsync($"/confirm/{type}/{value}");
        }

        public async Task ResendEmailConfirmationTokenAsync(string responseUrl)
        {
            await http.PostAsync($"/resend-email-confirmation/{responseUrl}");
        }

        public async Task SignUpAsync(string responseUrl, SignUpRequest request)
        {
            await http.PostAsync($"/{WebUtility.UrlEncode(responseUrl)}", request);
        }

        public async Task DeleteAsync()
        {
            await http.DeleteAsync("/");
        }
    }
}
