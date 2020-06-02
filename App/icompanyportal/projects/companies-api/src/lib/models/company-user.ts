import { CompanyUserPermission } from './company-user-permission';

export interface CompanyUser {
  companyId?: number;
  userId?: number;
  companyUserPermissions?: CompanyUserPermission[];
}
