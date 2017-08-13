import { Component } from '@angular/core';
import { Address } from '../core/address';

import { FabContainer, NavController, NavParams } from 'ionic-angular';
import { AddressListPage,SetupPage } from '../../app/pages';

import { AgmCoreModule } from 'angular2-google-maps/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  setup = SetupPage;
  address: Address;
  defaultMapInfo = {
    lat: 40.429761,
    lng: -111.8952174
  };
  located = false;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.address = navParams.data.address;
    if (this.address) {
      this.located = true;
    }
  }

  getLatitude(): number {
    return this.located ? Number(this.address.latitude) : this.defaultMapInfo.lat;
  }

  getLongitude(): number {
    return this.located ? Number(this.address.longitude) : this.defaultMapInfo.lng;
  }

  gotoLocations(fab: FabContainer) {
    fab.close();
    this.navCtrl.setRoot(AddressListPage);
  }

  close(fab: FabContainer) {
    fab.close();
  }
}
