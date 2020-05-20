interface ApiEndpoints {
  users: string;
  notifications: string;
  companies: string;
}

export interface IEnvironment {
  production: boolean;
  authToken: string;
  apiEndpoints: ApiEndpoints;
}
