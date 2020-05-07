using System.Threading.Tasks;

namespace iCompanyPortal.Api.Emailing.Client
{
    public interface IEmailingClient
    {
        Task SendAsync(EmailRequest request);
    }
}