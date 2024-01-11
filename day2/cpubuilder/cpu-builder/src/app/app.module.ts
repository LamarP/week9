import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoggedInInterceptor } from './logged-in.interceptor';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './header/header.component';
import { CpusComponent } from './cpus/cpus.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CpuPartsListComponent } from './cpu-parts-list/cpu-parts-list.component';

import { appReducer } from './app.reducer';
import { AuthenticationEffects } from './authentication/store/authentication.effects';
import { CpuEffects } from './cpus/store/cpu.effects';
import { CpuDetailComponent } from './cpus/cpu-detail/cpu-detail.component';
import { CpuEditComponent } from './cpus/cpu-edit/cpu-edit.component';
import { CpuListComponent } from './cpus/cpu-list/cpu-list.component';
import { CpuComponent } from './cpus/cpu-list/cpu/cpu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CpusComponent,
    AuthenticationComponent,
    CpuPartsListComponent,
    CpuDetailComponent,
    CpuEditComponent,
    CpuListComponent,
    CpuComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthenticationEffects, CpuEffects]),
    StoreModule.forRoot(appReducer)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: LoggedInInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
  app
    header
    router-outlet
      authentication
      cpu-parts-list
        parts-edit
      cpus
        cpu-detail
        cpu-edit
        cpu-list
        cpu-start
*/
