import { CompanyUserPermission } from './company-user-permission';
import { User } from 'users-api';

export interface CompanyUser {
  companyId?: number;
  userId?: number;
  companyUserPermissions?: CompanyUserPermission[];
  user?: User;
}
