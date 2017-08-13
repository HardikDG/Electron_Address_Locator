
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AddressServiceProvider } from '../core/address-service/address-service';
import { Address } from '../core/address';
import { HomePage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-address-list',
  templateUrl: 'address-list.html',
})
export class AddressListPage {
    public addresses: Promise<Address[]>;

constructor(public navCtrl: NavController,
    private addressService: AddressServiceProvider) {
  }

  ionViewDidLoad() {
    this.addresses = this.addressService.fetchAll();
  }

  selectLocation(address: Address) {
    this.navCtrl.setRoot(HomePage, { address });
  }

}
