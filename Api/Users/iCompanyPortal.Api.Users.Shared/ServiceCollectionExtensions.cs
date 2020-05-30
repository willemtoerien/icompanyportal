using iCompanyPortal.Api.Users.Shared;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddUsers(this IServiceCollection services, IConfiguration configuration)
        {
            var settings = new AuthSettings();
            var section = configuration.GetSection("Auth");
            section.Bind(settings);
            services
                .Configure<AuthSettings>(section)
                .AddTransient<IAuthenticator, Authenticator>()
                .AddTransient<TokenProvider>()
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.SaveToken = true;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey =
                            new SymmetricSecurityKey(Encoding.ASCII.GetBytes(settings.AuthenticationTokenKey)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var path = context.HttpContext.Request.Path;
                            if (!path.ToString().StartsWith("/api/hub"))
                            {
                                return Task.CompletedTask;
                            }
                            var accessToken = context.Request.Query["access_token"];
                            if (string.IsNullOrEmpty(accessToken))
                            {
                                return Task.CompletedTask;
                            }

                            if (path.StartsWithSegments("/api/hub"))
                            {
                                context.Token = accessToken;
                            }

                            return Task.CompletedTask;
                        }
                    };
                });
            return services;
        }
    }
}
