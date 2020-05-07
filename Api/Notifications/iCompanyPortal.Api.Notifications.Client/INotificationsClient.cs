using System.Threading.Tasks;

namespace iCompanyPortal.Api.Notifications.Client
{
    public interface INotificationsClient
    {
        Task<Notification[]> Get(int pageSize, int page);
        Task<int> GetCount(int userId);
        Task MarkAllAsRead();
        Task<int> Notify(int userId, NotifyRequest request);
    }
}