using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using iCompanyPortal.Api.Emailing.Client;
using iCompanyPortal.Api.HttpHelpers;
using iCompanyPortal.Api.Shared.Data;
using iCompanyPortal.Api.Users.Data;
using iCompanyPortal.Api.Users.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace iCompanyPortal.Api.Users
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
                .AddProjectCors(Configuration)
                .AddTransient<EntityBuilder, UserEntityBuilder>()
                .AddTransient<EntityBuilder, ConfirmationTokenEntityBuilder>()
                .AddProjectDbContext<UsersDbContext>(Configuration)
                .AddUsers(Configuration)
                .AddEmailingClient(Configuration)
                .AddTransient<PasswordHasher>()
                .Configure<UsersSettings>(Configuration.GetSection("Users"))
                .AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseProjectDbContext<UsersDbContext>();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseProjectCors();


            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseUsers();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
