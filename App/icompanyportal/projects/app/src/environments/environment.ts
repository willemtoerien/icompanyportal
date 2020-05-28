import { IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  production: false,
  authToken: 'authToken',
  apiEndpoints: {
    emailing: 'https://localhost:1000/api',
    users: 'https://localhost:1002/api',
    notifications: 'https://localhost:1004/api',
    companies: 'https://localhost:1006/api'
  }
};

import 'zone.js/dist/zone-error';
