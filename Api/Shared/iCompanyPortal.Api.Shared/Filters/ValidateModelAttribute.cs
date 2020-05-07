using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Text;

namespace iCompanyPortal.Api.Shared.Filters
{
    [AttributeUsage(AttributeTargets.Method)]
    public class ValidateModelAttribute : Attribute, IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var controller = (ControllerBase)context.Controller;
            if (!controller.ModelState.IsValid)
            {
                context.Result = controller.InvalidModelState();
            }
        }
    }
}
