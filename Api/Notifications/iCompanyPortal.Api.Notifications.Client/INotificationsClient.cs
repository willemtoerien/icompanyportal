using iCompanyPortal.Api.HttpHelpers;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Notifications.Client
{
    public interface INotificationsClient
    {
        Task<Notification[]> GetNotificationsAsync(GetQuery getQuery);
        Task<int> GetUnreadCountAsync(int userId);
        Task MarkAllAsReadAsync();
        Task<int> NotifyAsync(int userId, NotifyRequest request);
    }
}