using iCompanyPortal.Api.Shared.Data;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using iCompanyPortal.Api.Shared.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace Microsoft.AspNetCore.Builder
{
    public static class ApplicationBuilderExtensions
    {
        private static object lockObject = new object();
        private static bool isDbCreated;

        public static IApplicationBuilder UseProjectDbContext<TDbContext>(this IApplicationBuilder app)
            where TDbContext : ProjectDbContext
        {
            app.Use(async (context, next) =>
            {
                lock (lockObject)
                {
                    if (!isDbCreated)
                    {
                        var db = context.RequestServices.GetService<TDbContext>();
                        isDbCreated = db.Database.CanConnectAsync().GetAwaiter().GetResult();
                        if (!isDbCreated)
                        {
                            db.Database.EnsureCreatedAsync().GetAwaiter().GetResult();
                            isDbCreated = true;
                        }
                    }
                }

                await next();
            });
            return app;
        }

        public static IApplicationBuilder UseProjectCors(this IApplicationBuilder app)
        {
            app.UseCors();
            return app;
        }

        public static IApplicationBuilder UseProjectSwagger(this IApplicationBuilder app)
        {
            return app
                .UseOpenApi()
                .UseSwaggerUi3();
        }
    }
}
