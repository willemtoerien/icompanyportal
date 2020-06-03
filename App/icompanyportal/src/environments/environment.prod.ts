import { IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  production: true,
  apiEndpoints: {
    emailing: 'https://localhost:1000/api'
  },
  appEndpoint: 'https://localhost:4200'
};
