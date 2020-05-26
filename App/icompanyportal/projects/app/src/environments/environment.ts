import { IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  production: false,
  authToken: 'authToken',
  apiEndpoints: {
    users: 'https://localhost:1002/api/users',
    notifications: 'https://localhost:1004/api/notifications',
    companies: 'https://localhost:1006/api/companies'
  }
};

import 'zone.js/dist/zone-error';
