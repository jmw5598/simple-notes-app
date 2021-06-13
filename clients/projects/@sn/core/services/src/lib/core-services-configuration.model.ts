import { InjectionToken } from '@angular/core';

export const CORE_SERVICES_CONFIGURATION: InjectionToken<string> = new InjectionToken<string>('CORE_SERVICE_CONFIGURATION');

export interface AuthConfiguration {
  baseUrl: string;
}

export interface ApiConfiguration {
  baseUrl: string;
}

export interface CoreServicesConfiguration {
  auth: AuthConfiguration;
  api: ApiConfiguration;
}
