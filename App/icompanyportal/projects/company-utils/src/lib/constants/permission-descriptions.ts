import { CompanyUserPermissionType } from 'companies-api';

interface PermissionItem {
  type: CompanyUserPermissionType;
  description: string;
}

export const PERMISSION_DESCRIPTIONS: PermissionItem[] = [{ type: CompanyUserPermissionType.editSettings, description: 'Edit Settings' }];
