import { CompanyStatus } from './company-status';

export interface Company {
  companyId?: number;
  uniqueName?: string;
  name?: string;
  status?: CompanyStatus;
}
