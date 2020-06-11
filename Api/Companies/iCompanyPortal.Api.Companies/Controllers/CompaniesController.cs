using iCompanyPortal.Api.Companies.Client;
using iCompanyPortal.Api.Companies.Data;
using iCompanyPortal.Api.Companies.Filters;
using iCompanyPortal.Api.Companies.Models;
using iCompanyPortal.Api.HttpHelpers;
using iCompanyPortal.Api.Users.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NSwag.Annotations;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Controllers
{
    [Route("api")]
    [Authorize]
    public class CompaniesController : ControllerBase
    {
        public const string UniqueNameNotUnique = "This unique name has already been taken.";

        private readonly CompaniesDbContext db;

        public CompaniesController(CompaniesDbContext db)
        {
            this.db = db;
        }

        [HttpGet("{uniqueName}/is-unique")]
        [SwaggerResponse(200, typeof(bool))]
        [AllowAnonymous]
        public async Task<IActionResult> IsUniqueNameUnique(string uniqueName)
        {
            return Ok(!await db.Companies
                .Include(x => x.Subscription)
                .AnyAsync(x => x.UniqueName == uniqueName));
        }

        [HttpGet]
        [SwaggerResponse(200, typeof(Company[]))]
        public async Task<IActionResult> GetCompanies([FromQuery] GetQuery getQuery)
        {
            var userId = this.GetUserId();
            var companies = await db.CompanyUsers
                .Include(x => x.Company)
                .ThenInclude(x => x.Subscription)
                .Where(x => x.UserId == userId && x.Company.Status == CompanyStatus.Active)
                .Select(x => x.Company)
                .OrderBy(x => x.Name)
                .InvokeGetQuery(getQuery, x => x.Name.Contains(getQuery.Search) || x.UniqueName.Contains(getQuery.Search))
                .ToArrayAsync();
            return Ok(companies);
        }

        [HttpGet("{companyId}")]
        [CompanyExists]
        [ValidateCompanyUser]
        [SwaggerResponse(200, typeof(Company))]
        public async Task<IActionResult> GetCompany(int companyId)
        {
            var userId = this.GetUserId();
            var company = await db.Companies
                .Include(x => x.Subscription)
                .ThenInclude(x => x.SubscriptionPlan)
                .SingleOrDefaultAsync(x => x.CompanyId == companyId);
            return Ok(company);
        }

        [HttpGet("{companyId}/export")]
        [CompanyExists]
        [ValidateCompanyUser]
        [SwaggerResponse(200, typeof(object))]
        [CheckPermission(CompanyUserPermissionType.EditSettings)]
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
        [SwaggerResponse(200, typeof(Company[]))]
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

        [HttpGet("permissions")]
        [SwaggerResponse(200, typeof(Dictionary<CompanyUserPermissionType, string>))]
        [CheckPermission(CompanyUserPermissionType.EditSettings)]
        public IActionResult GetAvailablePermissions()
        {
            var type = typeof(CompanyUserPermissionType);
            var names = (string[])Enum.GetNames(type);
            var result = new Dictionary<CompanyUserPermissionType, string>();
            foreach (var name in names)
            {
                var value = (CompanyUserPermissionType)Enum.Parse(type, name);
                var info = type.GetMember(name)[0];
                var attribute = info.GetCustomAttribute<DescriptionAttribute>();
                result[value] = attribute.Description;
            }

            return Ok(result);
        }

        [HttpPut("{companyId}")]
        [CompanyExists]
        [ValidateCompanyUser]
        [SwaggerResponse(204, typeof(void))]
        [CheckPermission(CompanyUserPermissionType.EditSettings)]
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

            if (request.Logo != null && request.Logo.Length > 0)
            {
                company.Logo = request.Logo;
                company.LogoContentType = request.LogoContentType;
            }

            await db.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{companyId}/favorite/{value}")]
        [HttpPut("{companyId}/favorite")]
        [CompanyExists]
        [ValidateCompanyUser]
        [SwaggerResponse(204, typeof(void))]
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
        [SwaggerResponse(200, typeof(int))]
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
                Status = CompanyStatus.Active,
                Logo = request.Logo,
                LogoContentType = request.LogoContentType
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
            foreach (var type in (CompanyUserPermissionType[])Enum.GetValues(typeof(CompanyUserPermissionType)))
            {
                db.CompanyUserPermissions.Add(new CompanyUserPermission
                {
                    Type = type,
                    CompanyUser = companyUser,
                    IsSet = true,
                });
            }
            await db.SaveChangesAsync();
            return Ok(company.CompanyId);
        }

        [HttpDelete("{companyId}")]
        [CompanyExists]
        [ValidateCompanyUser]
        [SwaggerResponse(204, typeof(void))]
        [CheckPermission(CompanyUserPermissionType.EditSettings)]
        public async Task<IActionResult> Delete(int companyId)
        {
            var company = await db.Companies.SingleOrDefaultAsync(x => x.CompanyId == companyId);
            company.Status = CompanyStatus.PendingDeletion;
            company.DeleteAt = DateTime.Now.AddDays(15);
            await db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{companyId}/logo")]
        [CompanyExists]
        [ValidateCompanyUser]
        [SwaggerResponse(204, typeof(void))]
        [CheckPermission(CompanyUserPermissionType.EditSettings)]
        public async Task<IActionResult> DeleteAvatar(int companyId)
        {
            var company = await db.Companies.SingleOrDefaultAsync(x => x.CompanyId == companyId);
            company.Logo = null;
            company.LogoContentType = null;
            await db.SaveChangesAsync();
            return NoContent();
        }
    }
}
