using iCompanyPortal.Api.Companies.Client;
using iCompanyPortal.Api.Companies.Data;
using iCompanyPortal.Api.Companies.Filters;
using iCompanyPortal.Api.Companies.Models;
using iCompanyPortal.Api.Users.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Controllers
{
    [Route("")]
    [Authorize]
    public class CompaniesController : ControllerBase
    {
        public const string UniqueNameNotUnique = "This unique name has already been taken.";

        private readonly CompaniesDbContext db;
        private readonly IUsersClient usersClient;

        public CompaniesController(CompaniesDbContext db, IUsersClient usersClient)
        {
            this.db = db;
            this.usersClient = usersClient;
        }


        [HttpGet("is-alive")]
        public bool IsAlive() => true;


        [HttpGet("{uniqueName}/is-unique")]
        public async Task<IActionResult> IsUniqueNameUnique(string uniqueName)
        {
            return Ok(!await db.Companies.AnyAsync(x => x.UniqueName == uniqueName));
        }

        [HttpGet("{pageSize}/{page}")]
        public async Task<IActionResult> GetCompanies(int pageSize, int page)
        {
            var userId = this.GetUserId();
            var companies = await db.CompanyUsers
                .Include(x => x.Company)
                .Where(x => x.UserId == userId && x.Company.Status == CompanyStatus.Active)
                .Select(x => x.Company)
                .OrderBy(x => x.Name)
                .Skip(pageSize * page)
                .Take(pageSize)
                .ToArrayAsync();
            return Ok(companies);
        }

        [HttpGet("{companyId}")]
        [CompanyExists]
        [ValidateCompanyUser]
        public async Task<IActionResult> GetCompany(int companyId)
        {
            var userId = this.GetUserId();
            var company = await db.Companies.SingleOrDefaultAsync(x => x.CompanyId == companyId);
            return Ok(company);
        }

        [HttpGet("{companyId}/export")]
        [CompanyExists]
        [ValidateCompanyUser]
        public async Task<IActionResult> Export(int companyId)
        {
            var export = new ExportCompany();
            export.Company = await db.Companies
                .Include(x => x.CompanyUsers)
                .SingleAsync(x => x.CompanyId == companyId);
            var json = JsonConvert.SerializeObject(export, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            byte[] companyJson;
            using (var memory = new MemoryStream())
            {
                using (var writer = new StreamWriter(memory))
                {
                    await writer.WriteAsync(json);
                }

                companyJson = memory.ToArray();
            }

            return File(companyJson, "application/octet-stream");
        }

        [HttpGet("favorites")]
        public async Task<IActionResult> GetFavorites()
        {
            var userId = this.GetUserId();
            var companies = await db.CompanyUsers
                .Include(x => x.Company)
                .Where(x => x.UserId == userId && x.IsFavorite && x.Company.Status == CompanyStatus.Active)
                .Select(x => x.Company)
                .OrderBy(x => x.Name)
                .ToArrayAsync();
            return Ok(companies);
        }

        [HttpPut("{companyId}")]
        [CompanyExists]
        [ValidateCompanyUser]
        public async Task<IActionResult> Save(int companyId, [FromBody] SaveCompanyRequest request)
        {
            var company = await db.Companies.SingleOrDefaultAsync(x => x.CompanyId == companyId);
            if (!string.Equals(company.UniqueName, request.UniqueName, StringComparison.OrdinalIgnoreCase) &&
                await db.Companies.AnyAsync(x => x.UniqueName == request.UniqueName))
            {
                return this.BadRequest(nameof(SaveCompanyRequest.UniqueName), UniqueNameNotUnique);
            }
            company.Name = request.Name;
            company.UniqueName = request.UniqueName;

            await db.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{companyId}/favorite/{value}")]
        [HttpPut("{companyId}/favorite")]
        [CompanyExists]
        [ValidateCompanyUser]
        public async Task<IActionResult> SetFavorite(int companyId, bool? value)
        {
            var userId = this.GetUserId();
            var companyUser = await db.CompanyUsers.SingleAsync(x => x.CompanyId == companyId && x.UserId == userId);
            if (value.HasValue)
            {
                companyUser.IsFavorite = value.Value;
            }
            else
            {
                companyUser.IsFavorite = !companyUser.IsFavorite;
            }
            await db.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SaveCompanyRequest request)
        {
            if (await db.Companies.AnyAsync(x => x.UniqueName == request.UniqueName))
            {
                return this.BadRequest(nameof(SaveCompanyRequest.UniqueName), UniqueNameNotUnique);
            }
            var company = new Company
            {
                Name = request.Name,
                UniqueName = request.UniqueName,
                CreatedAt = DateTime.Now,
                Status = CompanyStatus.Active
            };
            db.Add(company);
            var userId = this.GetUserId();
            var companyUser = new CompanyUser
            {
                Company = company,
                UserId = userId,
                IsFavorite = true
            };
            db.Add(companyUser);
            await db.SaveChangesAsync();
            return Ok(company.CompanyId);
        }

        [HttpDelete("{companyId}")]
        [CompanyExists]
        [ValidateCompanyUser]
        public async Task<IActionResult> Delete(int companyId)
        {
            var company = await db.Companies.SingleOrDefaultAsync(x => x.CompanyId == companyId);
            company.Status = CompanyStatus.PendingDeletion;
            company.DeleteAt = DateTime.Now.AddDays(15);
            await db.SaveChangesAsync();
            return NoContent();
        }
    }
}
