import { CompanyInvitationStatus } from './company-invitation-status';
import { Company } from './company';

export interface CompanyInvitation {
  token?: string;
  companyId?: number;
  email?: string;
  status?: CompanyInvitationStatus;
  company?: Company;
}
