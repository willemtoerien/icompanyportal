using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.AspNetCore.Builder
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseUsers(this IApplicationBuilder builder)
        {
            builder.UseAuthentication();
            builder.UseAuthorization();
            return builder;
        }
    }
}
