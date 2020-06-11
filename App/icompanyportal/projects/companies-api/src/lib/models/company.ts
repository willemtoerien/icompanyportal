import { CompanyStatus } from './company-status';
import { Subscription } from './subscription';

export interface Company {
  companyId?: number;
  uniqueName?: string;
  name?: string;
  status?: CompanyStatus;
  logo?: string;
  logoContentType?: string;

  subscription?: Subscription;
}
