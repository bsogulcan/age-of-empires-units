import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideStore} from '@ngrx/store';
import {unitsReducer} from "./states/unit/units.reducer";
import {provideStoreDevtools} from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
    providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()), provideStore({units: unitsReducer}), provideStoreDevtools({
            maxAge: 25,
            logOnly: !isDevMode()
        })]
};
