using iCompanyPortal.Api.Companies.Client;
using iCompanyPortal.Api.Companies.Data;
using iCompanyPortal.Api.Companies.Filters;
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
    [Route("api/subscriptions")]
    [Authorize]
    public class SubscriptionsController : ControllerBase
    {
        private readonly CompaniesDbContext db;

        public SubscriptionsController(CompaniesDbContext db)
        {
            this.db = db;
        }

        [HttpGet("{companyId}")]
        [CompanyExists]
        [ValidateCompanyUser]
        [SwaggerResponse(200, typeof(Subscription))]
        [CheckPermission(CompanyUserPermissionType.EditSettings)]
        public async Task<IActionResult> Get(int companyId)
        {
            var subscription = await db.Subscriptions
                .Include(x => x.SubscriptionPlan)
                .SingleOrDefaultAsync(x => x.CompanyId == companyId);

            return Ok(subscription);
        }

        [HttpPost("{companyId}")]
        [CompanyExists]
        [ValidateCompanyUser]
        [SwaggerResponse(204, typeof(void))]
        [CheckPermission(CompanyUserPermissionType.EditSettings)]
        public async Task<IActionResult> Subscribe(int companyId, [FromBody] SubscriptionRequest request)
        {
            var subscription = await db.Subscriptions
                .Include(x => x.SubscriptionPlan)
                .SingleOrDefaultAsync(x => x.CompanyId == companyId);

            if (subscription == null)
            {
                subscription = new Subscription();
                db.Subscriptions.Add(subscription);
            }

            subscription.CompanyId = companyId;
            subscription.CurrencyCode = request.CurrencyCode;
            subscription.Status = SubscriptionStatus.Active;
            subscription.Length = request.Length;
            subscription.Type = request.Type;

            if (request.Length == SubscriptionLength.Monthly)
            {
                subscription.ExpiresOn = DateTime.Today.AddMonths(1);
            }
            else
            {
                subscription.ExpiresOn = DateTime.Today.AddYears(1);
            }

            await db.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{companyId}")]
        [CompanyExists]
        [ValidateCompanyUser]
        [SwaggerResponse(204, typeof(void))]
        [CheckPermission(CompanyUserPermissionType.EditSettings)]
        public async Task<IActionResult> Cancel(int companyId)
        {
            var subscription = await db.Subscriptions
                .Include(x => x.SubscriptionPlan)
                .SingleOrDefaultAsync(x => x.CompanyId == companyId);

            if (subscription == null)
            {
                return NotFound();
            }

            subscription.Status = SubscriptionStatus.Cancelled;

            return NoContent();
        }
    }
}
