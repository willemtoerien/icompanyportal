﻿using iCompanyPortal.Api.Emailing.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddEmailingClient(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddHttpClient<IEmailingClient, EmailingClient>(http =>
                {
                    http.BaseAddress = new Uri(configuration.GetSection("Api")["Emailing"]);
                });
            return services;
        }
    }
}
