import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { routes } from './app.routes';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment.development';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './store/effects';
import { provideState, provideStore } from '@ngrx/store';
import { bookshelfFeatureKey, bookshelfReducer } from './store/reducer';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
    ]),
    provideStore(),
    provideState({ name: bookshelfFeatureKey, reducer: bookshelfReducer }),
    provideEffects(UserEffects),
    provideHttpClient(),
    provideAnimationsAsync(),
  ],
};
