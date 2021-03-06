import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ElectronService } from 'ngx-electron';

import { AddressListPage, HomePage, SetupPage } from './pages';
import { AddressService } from "./core/address-service";
import { Address } from "./core/address";
import { StorageServiceProvider } from "./core/storage-service/storage-service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController
  rootPage = HomePage;

  constructor(
    platform: Platform, 
    private addressService: AddressService, 
    private electron: ElectronService,
    private storage: StorageServiceProvider) {
    
    platform
      .ready()
      .then(() => this.onReady())
  }

  onReady() {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    // StatusBar.styleDefault();
    // Splashscreen.hide();

    this.setupIpc();
  }

  setupIpc() {
    this.electron.ipcRenderer.on('onMap', () => this.nav.setRoot(HomePage));
    this.electron.ipcRenderer.on('onLocations', () => this.nav.setRoot(AddressListPage));
    this.electron.ipcRenderer.on('onPrefs', () => this.nav.setRoot(SetupPage));
    this.electron.ipcRenderer.on('onProvision', async (evt, address: Address) => {
      await this.addressService.provision(address)
      this.nav.setRoot(HomePage, { address })
    });
    this.electron.ipcRenderer.on('license', async (evt, license) => {
      console.log(license);
      await this.storage.setLicense(license);
    });
  }
}
