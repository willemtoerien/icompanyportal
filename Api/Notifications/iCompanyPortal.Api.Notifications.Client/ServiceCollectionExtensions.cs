using iCompanyPortal.Api.Notifications.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddNotificationsClient(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddHttpClient<INotificationsClient, NotificationsClient>(http =>
                {
                    http.BaseAddress = new Uri(configuration.GetSection("Api")["Notifications"]);
                });
            return services;
        }
    }
}
