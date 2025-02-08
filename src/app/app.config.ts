import {ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {loadingInterceptor} from "../shared/interceptors/loading/loading.interceptor";
import {provideTheme} from "./layout/theme.service";
import {provideDimensions} from "./layout/dimensions.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([
      loadingInterceptor,
    ])),
    provideTheme(),
    provideDimensions(),
  ]
};
