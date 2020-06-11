using iCompanyPortal.Api.Companies.Client;
using iCompanyPortal.Api.Companies.Data;
using iCompanyPortal.Api.Companies.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NSwag.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Controllers
{
    [Route("api/users/permissions")]
    public class CompanyUserPermissionsController : ControllerBase
    {
        private readonly CompaniesDbContext db;

        public CompanyUserPermissionsController(CompaniesDbContext db)
        {
            this.db = db;
        }

        [HttpGet("{companyId}/{userId}/{permissionType}")]
        [CompanyExists]
        [SwaggerResponse(200, typeof(bool))]
        public async Task<IActionResult> HasPermission(int companyId, int userId, CompanyUserPermissionType permissionType)
        {
            var permission = await db.CompanyUserPermissions
                .SingleOrDefaultAsync(x => x.CompanyId == companyId && x.UserId == userId && x.Type == permissionType);
            return Ok(permission?.IsSet);
        }

        [HttpPut("{companyId}/{userId}/{permissionType}/{isSet}")]
        [CompanyExists]
        [SwaggerResponse(204, typeof(void))]
        [CheckPermission(CompanyUserPermissionType.EditSettings)]
        public async Task<IActionResult> SetPermission(int companyId, int userId, CompanyUserPermissionType permissionType, bool isSet)
        {
            var permission = await db.CompanyUserPermissions
                .SingleOrDefaultAsync(x => x.CompanyId == companyId && x.UserId == userId && x.Type == permissionType);
            if (!isSet && (permission == null || !permission.IsSet))
            {
                return NoContent();
            }

            if (permission == null)
            {
                permission = db.Add(new CompanyUserPermission
                {
                    CompanyId = companyId,
                    Type = permissionType,
                    UserId = userId
                }).Entity;
            }

            permission.IsSet = isSet;

            await db.SaveChangesAsync();

            return NoContent();
        }
    }
}
