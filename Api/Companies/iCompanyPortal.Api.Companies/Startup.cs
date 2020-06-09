using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iCompanyPortal.Api.Companies.Data;
using iCompanyPortal.Api.Companies.Services;
using iCompanyPortal.Api.Shared.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace iCompanyPortal.Api.Companies
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddUsers(Configuration)
                .AddProjectCors(Configuration)
                .AddProjectDbContext<CompaniesDbContext>(Configuration)
                .AddEntityBuilder<CompanyEntityBuilder>()
                .AddEntityBuilder<CompanyInvitationEntityBuilder>()
                .AddEntityBuilder<CompanyUserEntityBuilder>()
                .AddEntityBuilder<CompanyUserPermissionEntityBuilder>()
                .AddHostedService<PermanentCompanyDeleter>()
                .AddEmailingClient(Configuration)
                .AddUsersClient(Configuration)
                .AddNotificationsClient(Configuration)
                .AddProjectSwagger(Configuration)
                .AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseProjectDbContext<CompaniesDbContext>();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseProjectCors();

            app.UseRouting();

            app.UseUsers();

            app.UseProjectSwagger();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
