using iCompanyPortal.Api.Companies.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace iCompanyPortal.Api.Companies.Filters
{
    public class CompanyExistsAttribute : Attribute, IAsyncActionFilter
    {
        public const string CompanyNotFound = "The company was not found.";

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var companyId = (int)context.ActionArguments["companyId"];
            var db = context.HttpContext.RequestServices.GetService<CompaniesDbContext>();
            if (!await db.Companies.AnyAsync(x => x.CompanyId == companyId))
            {
                context.Result = new NotFoundObjectResult(CompanyNotFound);
                return;
            }

            await next();
        }
    }
}
