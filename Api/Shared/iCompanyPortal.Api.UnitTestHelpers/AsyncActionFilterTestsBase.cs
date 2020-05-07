using iCompanyPortal.Api.Shared.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace iCompanyPortal.Api.UnitTestHelpers
{
    public abstract class AsyncActionFilterTestsBase<TController, TDbContext, TFilter> : ControllerTestsBase<TController, TDbContext>
        where TController : ControllerBase
        where TDbContext : ProjectDbContext
        where TFilter : IAsyncActionFilter, new()
    {
        public AsyncActionFilterTestsBase()
        {
        }

        public async Task<ActionExecutingContext> OnActionExecutionAsync(TController controller, Dictionary<string, object> arguments = null)
        {
            if (arguments == null)
            {
                arguments = new Dictionary<string, object>();
            }
            var httpContext = new DefaultHttpContext
            {
                RequestServices = Provider
            };
            var actionContext = new ActionContext(httpContext, new RouteData(), new ActionDescriptor());
            var filterMetadata = new List<IFilterMetadata>();
            var executingContext = new ActionExecutingContext(actionContext, filterMetadata, arguments, controller);
            var executedContext = new ActionExecutedContext(actionContext, filterMetadata, controller);
            var wasNextCalled = false;
            var next = new ActionExecutionDelegate(() =>
            {
                wasNextCalled = true;
                return Task.FromResult(executedContext);
            });
            var filter = new TFilter();
            await filter.OnActionExecutionAsync(executingContext, next);
            Assert.True(wasNextCalled);
            return executingContext;
        }
    }
}
