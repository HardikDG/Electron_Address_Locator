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
  provisionedAddressId = '';

  constructor(
    private addressService: AddressService,
    private setupService: SetupService,
    public navCtrl: NavController,
    private navParams: NavParams) {
    this.address = navParams.data.address;
  }

  async ionViewWillEnter() {
    await this.ensureSetup();
  }

  async ensureSetup(): Promise<boolean> {
    let person = await this.setupService.fetchPerson();
    if (!person.phone || !person.name) {
      return this.navCtrl.setRoot(SetupPage);
    } else {
      return this.ensureLocations();
    }
  }

  async ensureLocations(): Promise<boolean> {
    var [addresses, provisionedAddressId] = await Promise.all([
      this.addressService.fetchAll(),
      this.addressService.getProvisionedAddressId()]);

    this.provisionedAddressId = provisionedAddressId;

    // If current address is already provisioned, we can skip the next part.
    if (this.address && this.address.id === this.provisionedAddressId) {
      return;
    }

    // If not, we can switch to the address that IS provisioned.
    addresses.forEach(element => {
      if (element.id === this.provisionedAddressId) {
        this.address = element;
      }
    });
  }
  
  located(): boolean {
    return this.address && this.address.id === this.provisionedAddressId;
  }

  getLatitude(): number {
    return this.located() ? Number(this.address.latitude) : this.defaultMapInfo.lat;
  }

  getLongitude(): number {
    return this.located() ? Number(this.address.longitude) : this.defaultMapInfo.lng;
  }

  gotoLocations(fab: FabContainer) {
    fab.close();
    this.navCtrl.setRoot(AddressListPage);
  }

  close(fab: FabContainer) {
    fab.close();
  }
}
