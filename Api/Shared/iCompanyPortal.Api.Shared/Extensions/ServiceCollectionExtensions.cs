using iCompanyPortal.Api.Shared.Data;
using iCompanyPortal.Api.Shared.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NSwag;
using NSwag.Generation.Processors.Security;
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

        public static IServiceCollection AddProjectSwagger(this IServiceCollection services, IConfiguration configuration)
        {
            return services.AddOpenApiDocument(config =>
            {
                config.Title = configuration.GetSection("Application")["Title"];
                config.Version = configuration.GetSection("Application")["Version"];
                config.GenerateEnumMappingDescription = true;
                if (configuration.GetSection("Auth") != null)
                {
                    config.DocumentProcessors.Add(new SecurityDefinitionAppender("JWT", new[] { "Bearer" }, new OpenApiSecurityScheme
                    {
                        Name = "Authorization",
                        Type = OpenApiSecuritySchemeType.ApiKey,
                        Description = "Bearer {JWT}",
                        In = OpenApiSecurityApiKeyLocation.Header
                    }));
                }
            });
        }
    }
}
