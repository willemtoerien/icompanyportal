﻿using iCompanyPortal.Api.Companies.Data;
using iCompanyPortal.Api.Companies.Filters;
using iCompanyPortal.Api.Notifications.Client;
using iCompanyPortal.Api.Users.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Controllers
{
    [Route("users")]
    public class CompanyUsersController : ControllerBase
    {
        private readonly CompaniesDbContext db;
        private readonly INotificationsClient notificationsClient;

        public CompanyUsersController(CompaniesDbContext db, INotificationsClient notificationsClient)
        {
            this.db = db;
            this.notificationsClient = notificationsClient;
        }

        [HttpGet("{companyId}/all")]
        [CompanyExists]
        [ValidateCompanyUser]
        public async Task<IActionResult> GetCompanyUsers(int companyId)
        {
            var users = await db.CompanyUsers
                .Where(x => x.CompanyId == companyId)
                .ToArrayAsync();
            return Ok(users);
        }

        [HttpGet("{companyId}")]
        [CompanyExists]
        public async Task<IActionResult> Get(int companyId)
        {
            var userId = this.GetUserId();
            var companyUser = await db.CompanyUsers.SingleOrDefaultAsync(x => x.CompanyId == companyId && x.UserId == userId);
            return Ok(companyUser);
        }

        [HttpPost("{companyId}/notify")]
        [CompanyExists]
        [ValidateCompanyUser]
        public async Task<IActionResult> Notify(int companyId, [FromBody] NotifyRequest request)
        {
            var users = await db.CompanyUsers
                .Where(x => x.CompanyId == companyId)
                .ToArrayAsync();
            foreach (var user in users)
            {
                await notificationsClient.Notify(user.UserId, request);
            }
            return NoContent();
        }

        [HttpDelete("{companyId}/{userId}")]
        [CompanyExists]
        [ValidateCompanyUser]
        public async Task<IActionResult> Delete(int companyId, int userId)
        {
            var user = await db.CompanyUsers.SingleOrDefaultAsync(x => x.CompanyId == companyId && x.UserId == userId);
            db.Remove(user);
            await db.SaveChangesAsync();
            return NoContent();
        }
    }
}