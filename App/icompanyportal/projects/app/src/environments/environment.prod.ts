import { IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  production: true,
  authToken: 'authToken',
  apiEndpoints: {
    emailing: 'https://icompanyportal.com:1000/api',
    users: 'https://icompanyportal.com:1002/api',
    notifications: 'https://icompanyportal.com:1004/api',
    companies: 'https://icompanyportal.com:1006/api'
  }
};
