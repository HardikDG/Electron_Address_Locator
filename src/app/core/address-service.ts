import { Injectable } from '@angular/core';
import 'rxjs';
import 'rxjs/add/operator/map';
import { Address } from './address';
import { DispatcherService } from './dispatcher-service';
import { ElectronIpcService } from "./electronipc-service";
import { SetupService } from "./setup-service";

@Injectable()
export class AddressService {
  // private addresses: Address[];

  constructor(
    private setupService: SetupService,
    private dispatcher: DispatcherService,
    private ipc: ElectronIpcService) {
  }

  // Async version
  async fetchAll(): Promise<Address[]> {
    let person = await this.setupService.fetchPerson();
    let addresses = await this.dispatcher
      .getAddressesByPhone(person.phone);
    this.ipc.updateLocationsMenu(addresses);
    return addresses;
  }

  // Non async version
  // fetchAll(): Promise<Address[]> {
  //   return this.setupService.fetchPerson()
  //   .then(person => {
  //     return this.dispatcher.getAddressesByPhone(person.phone)
  //     .then(addresses => {
  //       this.ipc.updateLocationsMenu(addresses);
  //       return addresses;
  //     });
  //   });
  // }

  validate(address: Address): Promise<Address> {
    return this.dispatcher.validateAddress(address);
  }

  async add(address: Address): Promise<Address> {
    let person = await this.setupService.fetchPerson();
    address.endpoint = {
      callerName: person.name,
      did: person.phone
    };

    return this.dispatcher.addAddress(address);
  }

  provision(address: Address): Promise<boolean> {
    return this.dispatcher.provisionAddress(address);
  }

  remove(address: Address): Promise<boolean> {
    return this.dispatcher.removeAddress(address);
  }
}
