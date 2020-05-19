import { UserStatus } from './user-status';

export interface User {
  userId?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  status?: UserStatus;
  avatarUrl?: string;
}
