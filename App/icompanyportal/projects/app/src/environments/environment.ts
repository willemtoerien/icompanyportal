import { IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  production: false,
  authToken: 'authToken',
  apiEndpoints: {
    emailing: 'http://localhost:1000/api',
    users: 'http://localhost:1001/api',
    notifications: 'http://localhost:1002/api',
    companies: 'http://localhost:1003/api'
  }
};

import 'zone.js/dist/zone-error';
