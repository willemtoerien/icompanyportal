import { SignUpRequest } from './sign-up-request';

export interface SaveUserRequest extends SignUpRequest {
  confirmPassword?: string;
}
