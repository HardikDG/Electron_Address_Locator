import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController } from 'ionic-angular';
import { AddressService } from '../core/address-service';
import { Address } from '../core/address';
import { AddressDetailPage, HomePage } from '../pages';

@Component({
  selector: 'page-address-list',
  templateUrl: 'address-list.html'
})

export class AddressListPage {
  public addresses: Address[];
  provisionedAddressId: string = '';

  constructor(
    private addressService: AddressService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private navCtrl: NavController) { }

  async ionViewDidLoad() {
    this.loadSavedAddresses();
  }

  async loadSavedAddresses() {
    let loading = this.loadingController.create({ content: 'Loading Saved Addresses...' });
    loading.present();

    try {
      [this.addresses, this.provisionedAddressId] = await Promise.all([
        this.addressService.fetchAll(),
        this.addressService.getProvisionedAddressId()]);
    } catch (err) {
      console.error(err);
    } finally {
      loading.dismiss();
    }
  }

  edit(address: Address) {
    let modal = this.modalController.create(AddressDetailPage, { address });
    modal.present();
    modal.onDidDismiss((data) => {
      if (data) {
        this.save(data);
      }
    });
  }

  add() {
    let address = new Address();
    this.edit(address);
  }

  async save(address: Address) {
    let loading = this.loadingController.create({ content: 'Saving Address...' });
    loading.present();
    try {
      await this.addressService.save(address);
      await this.loadSavedAddresses();
    } catch (err) {
      console.error(err);
    }
    finally {
      loading.dismiss();
    }
  }

  remove(address: Address) {
    let alert = this.alertController.create({
      title: 'Delete Address?',
      message: `Are you sure you want to delete ${address.name || ''} ${address.addressLine1 || ''} ${address.community || ''}?`,
      buttons: [
            { text: 'No', role: 'cancel' },
            {
              text: 'Yes',
              handler: () => {
                this.doRemoveAddress(address)
              }
            }
          ]
    });

    alert.present();
  }

  async doRemoveAddress(address: Address) {
    let loading = this.loadingController.create({ content: 'Deleting Addresses...' });
    loading.present();

    try {
      await this.addressService.remove(address);
      await this.loadSavedAddresses();
    } catch (err) {
      console.error(err);
    } finally {
      loading.dismiss();
    }
  }

  async selectLocation(address: Address) {
    let loading = this.loadingController.create({ content: 'Setting Your Address...' });
    loading.present();

    try {
      let isSuccessful = await this.addressService.provision(address);
      if (isSuccessful) {
        this.navCtrl.setRoot(HomePage, { address });
      }
    }
    catch (err) {
      console.log(err)
    }
    finally {
      loading.dismiss();
    }
  }
}
