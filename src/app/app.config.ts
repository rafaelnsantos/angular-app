import {ApplicationConfig, isDevMode} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {loadingInterceptor} from "../shared/interceptors/loading/loading.interceptor";
import {provideTheme} from "./layout/theme.service";
import {provideDimensions} from "./layout/dimensions.service";
import {provideWebAuthn} from "../shared/services/webauthn/web-authn.service";
import {environment} from "../environments/environment";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),
    provideHttpClient(withInterceptors([
      loadingInterceptor,
    ])),
    provideTheme(),
    provideDimensions(),
    provideWebAuthn(environment.api.webauthn)
  ]
};
