import { IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  production: false,
  apiEndpoints: {
    emailing: 'https://localhost:1000/api'
  },
  appEndpoint: 'https://localhost:4200'
};

import 'zone.js/dist/zone-error';
