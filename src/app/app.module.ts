import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from "@angular/http";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { AddressDetailPage, AddressListPage, HomePage, SetupPage } from './pages';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { NgxElectronModule } from 'ngx-electron';
import { AddressService } from './core/address-service';
import { SetupService } from './core/setup-service';
import { DispatcherService } from './core/dispatcher-service';
import { ElectronIpcService } from "./core/electronipc-service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SetupPage,
    AddressDetailPage,
    AddressListPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot(),
    NgxElectronModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SetupPage,
    AddressDetailPage,
    AddressListPage
  ],
  providers: [AddressService, SetupService, DispatcherService, ElectronIpcService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }

