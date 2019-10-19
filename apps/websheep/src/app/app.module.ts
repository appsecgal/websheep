import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import {
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ApiSelectorModule } from './api-selector/api-selector/api-selector.component';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthEffects } from './auth/auth.effects';
import { HackAssistantModule } from './hack-menu/hack-assistant.component';
import { AuthInterceptor } from './http/auth.interceptor';
import { PrependBaseUrlInterceptor } from './http/prepend-base-url.interceptor';
import { NavModule } from './nav/nav.component';
import { metaReducers, reducers } from './reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([AuthEffects]),
    HttpClientModule,
    NavModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    FlexModule,
    ApiSelectorModule,
    MatSidenavModule,
    HackAssistantModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PrependBaseUrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
