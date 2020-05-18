using System;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Users.Client
{
    public interface IUsersClient
    {
        Task ConfirmAsync(ConfirmationTokenType type, Guid value);
        Task DeleteAsync();
        Task<bool> DoesUserExistAsync(int userId);
        Task<UserInfo> GetSignedInUserAsync();
        Task<UserInfo> GetUserAsync(int userId);
        Task<UserInfo[]> GetUsersAsync(string userIds);
        Task<UserInfo> GetUserByEmailAsync(string email);
        Task<bool> IsEmailUniqueAsync(string email);
        Task ResendEmailConfirmationTokenAsync(string responseUrl);
        Task ResetPasswordAsync(string responseUrl, ResetPasswordRequest request);
        Task SaveAsync(string responseUrl, SaveUserRequest request);
        Task SignInAsync(SignInRequest request);
        Task SignUpAsync(string responseUrl, SignUpRequest request);
    }
}