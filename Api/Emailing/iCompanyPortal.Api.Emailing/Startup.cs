using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iCompanyPortal.Api.Emailing.Data;
using iCompanyPortal.Api.Emailing.Services;
using iCompanyPortal.Api.Shared.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace iCompanyPortal.Api.Emailing
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
                .AddTransient<EntityBuilder, EmailEntityBuilder>()
                .AddProjectDbContext<EmailingDbContext>(Configuration)
                .Configure<EmailSettings>(Configuration.GetSection("EmailSettings"))
                .AddTransient<ITemplator, LocalTemplator>()
                .AddTransient<EmailSender>()
                .AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, EmailingDbContext db)
        {
            app.UseProjectDbContext<EmailingDbContext>();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseProjectCors();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
