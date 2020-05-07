using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Microsoft.AspNetCore.Mvc
{
    public static class ActionResultExtensions
    {
        public static void AssertErrorMessage(this IActionResult actionResult, string key, string errorMessage)
        {
            var badRequest = Assert.IsType<BadRequestObjectResult>(actionResult);
            var error = Assert.IsType<SerializableError>(badRequest.Value);
            var messages = (string[])error[key];
            Assert.Equal(errorMessage, messages[0]);
        }

        public static void AssertErrorMessage(this IActionResult actionResult, string errorMessage, int statusCode = 400)
        {
            var objectResult = Assert.IsAssignableFrom<ObjectResult>(actionResult);
            Assert.Equal(statusCode, objectResult.StatusCode);
            Assert.Equal(errorMessage, objectResult.Value);
        }
    }
}
