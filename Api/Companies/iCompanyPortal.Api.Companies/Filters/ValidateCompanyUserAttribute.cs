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
    [AttributeUsage(AttributeTargets.Method)]
    public class ValidateCompanyUserAttribute : Attribute, IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var companyId = (int)context.ActionArguments["companyId"];
            var userId = ((ControllerBase)context.Controller).GetUserId();
            var db = context.HttpContext.RequestServices.GetService<CompaniesDbContext>();
            if (!await db.CompanyUsers.AnyAsync(x => x.CompanyId == companyId && x.UserId == userId))
            {
                context.Result = new ForbidResult();
            }

            await next();
        }
    }
}
