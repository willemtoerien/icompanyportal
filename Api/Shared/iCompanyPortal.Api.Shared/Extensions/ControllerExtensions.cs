using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.AspNetCore.Mvc
{
    public static class ControllerExtensions
    {
        public static BadRequestObjectResult InvalidModelState(this ControllerBase controller)
        {
            return new BadRequestObjectResult(controller.ModelState);
        }

        public static BadRequestObjectResult BadRequest(this ControllerBase controller, string key, string errorMessage)
        {
            controller.ModelState.AddModelError(key, errorMessage);
            return controller.InvalidModelState();
        }
    }
}
