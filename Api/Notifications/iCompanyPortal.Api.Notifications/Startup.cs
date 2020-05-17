using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iCompanyPortal.Api.Notifications.Data;
using iCompanyPortal.Api.Notifications.Hubs;
using iCompanyPortal.Api.Notifications.Services;
using iCompanyPortal.Api.Shared.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace iCompanyPortal.Api.Notifications
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
                .AddProjectDbContext<NotificationsDbContext>(Configuration)
                .AddTransient<EntityBuilder, NotificationEntityBuilder>()
                .AddSingleton<IUserIdProvider, NameUserIdProvider>()
                .AddUsersClient(Configuration)
                .AddControllers();
            services
                .AddSignalR();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseProjectDbContext<NotificationsDbContext>();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseProjectCors();
            app.UseUsers();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<NotificationsHub>("/hub");
            });
        }
    }
}
