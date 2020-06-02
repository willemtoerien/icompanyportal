using iCompanyPortal.Api.Companies.Client;
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
    public class CheckPermissionAttribute : Attribute, IAsyncActionFilter
    {
        public List<CompanyUserPermissionType> Types { get; set; }

        public CheckPermissionAttribute()
        {
            Types = new List<CompanyUserPermissionType>();
        }

        public CheckPermissionAttribute(params CompanyUserPermissionType[] types)
        {
            Types = types.ToList();
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var companyId = (int)context.ActionArguments["companyId"];
            var userId = ((ControllerBase)context.Controller).GetUserId();
            var db = context.HttpContext.RequestServices.GetService<CompaniesDbContext>();
            var count = await db.CompanyUserPermissions.Where(x => Types.Contains(x.Type) && x.IsSet && x.UserId == userId && x.CompanyId == companyId).CountAsync();
            if (count != Types.Count)
            {
                context.Result = new ForbidResult();
                return;
            }

            await next();
        }
    }
}
