using iCompanyPortal.Api.Users.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddUsersClient(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddHttpClient<IUsersClient, UsersClient>(http =>
                {
                    http.BaseAddress = new Uri(configuration.GetSection("Api")["Users"]);
                });
            return services;
        }
    }
}
