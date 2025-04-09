import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';
import { DialogService } from 'primeng/dynamicdialog'
import { MessageService } from 'primeng/api'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModelSelector: 'system',
          cssLayer: false
        },
      },
      ripple: true
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    DialogService,
    MessageService
  ]
};
