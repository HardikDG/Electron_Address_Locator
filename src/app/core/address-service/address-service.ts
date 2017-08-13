
import { Injectable } from '@angular/core';
import { Address } from './../address';

@Injectable()
export class AddressServiceProvider {

  private addresses: Address[] = [];

  constructor() {
    this.addresses.push(new Address(1, 'Home', '315 Muchado Hill Rd', '', 'Alton', 'NH', '03809', 'home', '', '43.3778073', '-71.1905709'));
    this.addresses.push(new Address(2, 'Hanaford', '80 Wolfeboro Hwy', '', 'Alton', 'NH', '03809', 'cafe', '', '43.4538906', '-71.21104919999999'));
    this.addresses.push(new Address(3, 'McDonald\'s', '4 Homestead Pl', '', 'Alton', 'NH', '03809', 'restaurant', '', '43.4518239', '-71.2103229'));
  }

  fetchAll() : Promise<Address[]>{
    var p = Promise.resolve<Address[]>(this.addresses);
    return p;
  }

}
