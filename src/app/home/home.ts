import { Component } from '@angular/core';
import { FabContainer, NavController, NavParams } from 'ionic-angular';
import { Address } from '../core/address';
import { AddressListPage, SetupPage } from '../../app/pages';
import { AddressService } from "../core/address-service";
import { SetupService } from "../core/setup-service";

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

  constructor(
    private addressService: AddressService,
    private setupService: SetupService,
    public navCtrl: NavController,
    private navParams: NavParams) {
    this.address = navParams.data.address;
  }

  async ionViewWillEnter() {
    await this.ensureSetup();
    if (this.address && this.address.addressStatus === 'PROVISIONED') {
      this.located = true;
    }
  }

  async ensureSetup():Promise<boolean> {
    let person = await this.setupService.fetchPerson();
    if (!person.phone || !person.name) {
      return this.navCtrl.setRoot(SetupPage);
    } else {
      return this.ensureLocations(person.phone);
    }
  }

  async ensureLocations(phone): Promise<boolean> {
    // Not happy that this function is being used just for its menu bar side effect.
    // Should probably fix that and fix how we determine which one is provisioned.
    var addresses = await this.addressService.fetchAll();

    // If current address is already provisioned, we can skip the next part.
    if (this.address && this.address.addressStatus === 'PROVISIONED') {return;}
    
    addresses.forEach(element => {
      if (element.addressStatus === 'PROVISIONED') {
        this.address = element;
      }
    });
  }

  async ionViewDidEnter() {
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
