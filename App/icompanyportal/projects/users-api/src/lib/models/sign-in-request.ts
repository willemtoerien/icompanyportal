import { ResetPasswordRequest } from './reset-password-request';

export interface SignInRequest extends ResetPasswordRequest {
  password: string;
}
