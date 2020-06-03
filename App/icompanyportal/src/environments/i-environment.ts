interface ApiEndpoints {
  emailing: string;
}

export interface IEnvironment {
  production: boolean;
  apiEndpoints: ApiEndpoints;
  appEndpoint: string;
}
