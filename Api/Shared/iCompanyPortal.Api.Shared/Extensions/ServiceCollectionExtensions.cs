using iCompanyPortal.Api.Shared.Data;
using iCompanyPortal.Api.Shared.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddProjectCors(this IServiceCollection services, IConfiguration configuration)
        {
            return services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder => builder
                        .WithOrigins(configuration["AllowedOrigins"].Split(';'))
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });
        }

        public static IServiceCollection AddProjectDbContext<DbContext>(this IServiceCollection services, IConfiguration configuration)
            where DbContext : ProjectDbContext
        {
            return services.AddDbContext<DbContext>(x => x.UseSqlServer(configuration.GetConnectionString("iCompanyPortal")));
        }

        public static IServiceCollection AddEntityBuilder<TEntityBuilder>(this IServiceCollection services)
            where TEntityBuilder : EntityBuilder
        {
            return services.AddTransient<EntityBuilder, TEntityBuilder>();
        }

        public static IServiceCollection AddVersioning(this IServiceCollection services, IConfiguration configuration)
        {
            return services.Configure<VersionSettings>(v =>
            {
                v.Version = configuration["Version"];
            });
        }
    }
}
