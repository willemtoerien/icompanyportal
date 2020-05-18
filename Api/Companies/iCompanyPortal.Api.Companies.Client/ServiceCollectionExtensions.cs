using iCompanyPortal.Api.Companies.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCompaniesClients(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddHttpClient<ICompaniesClient, CompaniesClient>(http =>
                {
                    http.BaseAddress = new Uri(configuration.GetSection("Api")["Companies"]);
                });
            services.AddHttpClient<ICompanyInvitationsClient, CompanyInvitationsClient>(http =>
                {
                    http.BaseAddress = new Uri(configuration.GetSection("Api")["Companies"] + "/invitations");
                });
            services.AddHttpClient<ICompanyUsersClient, CompanyUsersClient>(http =>
                {
                    http.BaseAddress = new Uri(configuration.GetSection("Api")["Companies"] + "/users");
                });
            return services;
        }
    }
}
