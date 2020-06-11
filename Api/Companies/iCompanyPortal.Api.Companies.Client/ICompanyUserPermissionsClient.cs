using System.Threading.Tasks;

namespace iCompanyPortal.Api.Companies.Client
{
    public interface ICompanyUserPermissionsClient
    {
        Task<bool> HasPermission(int companyId, int userId, CompanyUserPermissionType permissionType);
        Task SetPermission(int companyId, int userId, CompanyUserPermissionType permissionType, bool isSet);
    }
}