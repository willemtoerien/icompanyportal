using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Client
{
    public interface ISubscriptionsClient
    {
        Task CancelAsync(int companyId);
        Task<Subscription> GetAsync(int companyId);
        Task SubscribeAsync(int companyId, SubscriptionRequest request);
    }
}