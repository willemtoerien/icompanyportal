import { IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  production: true,
  authToken: 'authToken',
  apiEndpoints: {
    users: 'https://localhost:1002',
    notifications: 'https://localhost:1004',
    companies: 'https://localhost:1006'
  }
};
