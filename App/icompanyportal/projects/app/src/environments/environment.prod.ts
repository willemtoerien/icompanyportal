import { IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  production: true,
  authToken: 'authToken',
  apiEndpoints: {
    users: 'https://icompanyportal:1002/api/users',
    notifications: 'https://icompanyportal:1004/api/notifications',
    companies: 'https://icompanyportal:1006/api/companies'
  }
};
