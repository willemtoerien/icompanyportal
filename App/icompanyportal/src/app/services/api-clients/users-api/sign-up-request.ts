import { SignInRequest } from './sign-in-request';

export interface SignUpRequest extends SignInRequest {
  firstName?: string;
  lastName?: string;
}
