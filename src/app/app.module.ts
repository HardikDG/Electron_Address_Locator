import { AgmCoreModule } from 'angular2-google-maps/core';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { SetupPage } from './setup/setup';
import { HomePage } from './home/home';
import { AddressListPage } from './address-list/address-list';

import { AddressServiceProvider } from './core/address-service/address-service';

import {NgxElectronModule } from 'ngx-electron';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SetupPage,
    AddressListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot(),
    NgxElectronModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SetupPage,
    AddressListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AddressServiceProvider
  ]
})
export class AppModule {}
