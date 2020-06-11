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

        [HttpGet("{currencyCode}")]
        [SwaggerResponse(200, typeof(SubscriptionPlan[]))]
        public async Task<IActionResult> Get(string currencyCode)
        {
            var plans = await db.SubscriptionPlans
                .Where(x => x.CurrencyCode == currencyCode)
                .ToArrayAsync();
            return Ok(plans);
        }

        [HttpGet("{currencyCode}/{type}/{length}")]
        public async Task<IActionResult> GetAmount(string currencyCode, SubscriptionPlanType type, SubscriptionLength length)
        {
            var plan = await db.SubscriptionPlans
                .SingleOrDefaultAsync(x => x.CurrencyCode == currencyCode && x.Type == type && x.Length == length);
            if (plan == null)
            {
                return NotFound();
            }

            return Ok(plan.Amount);
        }
    }
}
