import { CompanyUserPermissionType } from './company-user-permission-type';

export interface CompanyUserPermission {
  type?: CompanyUserPermissionType;
  companyId?: number;
  userId?: number;
  isSet?: boolean;
}
