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
            var companiesBaseAddress = configuration.GetSection("Api")["Companies"];
            services.AddHttpClient<ICompaniesClient, CompaniesClient>(http =>
            {
                http.BaseAddress = new Uri(companiesBaseAddress);
            });
            services.AddHttpClient<ICompanyInvitationsClient, CompanyInvitationsClient>(http =>
            {
                http.BaseAddress = new Uri(companiesBaseAddress + "/invitations");
            });
            services.AddHttpClient<ICompanyUsersClient, CompanyUsersClient>(http =>
            {
                http.BaseAddress = new Uri(companiesBaseAddress + "/users");
            });
            services.AddHttpClient<ISubscriptionsClient, SubscriptionsClient>(http =>
            {
                http.BaseAddress = new Uri(companiesBaseAddress + "/subscriptions");
            });
            services.AddHttpClient<ICompanyUserPermissionsClient, CompanyUserPermissionsClient>(http =>
            {
                http.BaseAddress = new Uri(companiesBaseAddress = "/users/permissions");
            });
            return services;
        }
    }
}
