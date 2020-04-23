import { NgModule, InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
  identityApiUrl: string;
  applicationApiUrl: string;
}

export const APP_DI_CONFIG: AppConfig = {
  identityApiUrl: environment.identityApiUrl,
  applicationApiUrl: environment.applicationApiUrl,
};

@NgModule({
  providers: [
    {
      provide: APP_CONFIG,
      useValue: APP_DI_CONFIG,
    },
  ],
})
export class AppConfigModule {}
