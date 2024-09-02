import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"dabubble-9fa24","appId":"1:481587044171:web:9bd7806ffc5b7c77c592ce","storageBucket":"dabubble-9fa24.appspot.com","apiKey":"AIzaSyA7kF5mVVQ7n1NUFwYIOiRggal1hup4rkg","authDomain":"dabubble-9fa24.firebaseapp.com","messagingSenderId":"481587044171"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
