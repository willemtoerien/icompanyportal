using iCompanyPortal.Api.Companies.Client;
using iCompanyPortal.Api.Companies.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NSwag.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Controllers
{
    [Route("api/subscription-plans")]
    [AllowAnonymous]
    public class SubscriptionPlansController : ControllerBase
    {
        private readonly CompaniesDbContext db;

        public SubscriptionPlansController(CompaniesDbContext db)
        {
            this.db = db;
        }

        [HttpGet("{currencyCode}/{length}")]
        [SwaggerResponse(200, typeof(SubscriptionPlan[]))]
        public async Task<IActionResult> Get(string currencyCode, SubscriptionLength length)
        {
            var plans = await db.SubscriptionPlans
                .Where(x => x.CurrencyCode == currencyCode && x.Length == length)
                .ToArrayAsync();
            return Ok(plans);
        }
    }
}
