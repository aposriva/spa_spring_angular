import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { authorizationInterceptor, xRequestedWithInterceptor } from './services/backend/authorization.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withXsrfConfiguration({cookieName:"XSRF-TOKEN", headerName: "X-XSRF-TOKEN"}), withInterceptors([authorizationInterceptor, xRequestedWithInterceptor]))]
};
