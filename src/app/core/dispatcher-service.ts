import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Address } from './address';
import 'rxjs';
import 'rxjs/add/operator/map';
import { dispatcherApi } from "./config";

@Injectable()
/**
 * A Stateless service that interacts with the Conveyant Dispatcher web service.
 */
export class DispatcherService {
  constructor(private http: Http) {
  }

  getAddressesByPhone(phone: string): Promise<Address[]> {
    const url = `${dispatcherApi.url}/GetAddressesByDid/${phone}`;

    return this.http.get(url)
      .retry(2)
      .map(x => {
        var result: Address[] = x.json();
        return result;
      })
      .toPromise();
  }

  validateAddress(address: Address): Promise<Address> {
    const url = `${dispatcherApi.url}/ValidateAddress`;

    return this.http.post(url, address)
      .map(x => {
        let result: Address = x.json();
        return result;
      }).toPromise();
  }

  addAddress(address: Address): Promise<Address> {
    const url = `${dispatcherApi.url}/AddAddress`;

    return this.http.post(url, address)
      .map(x => {
        let result: Address = x.json();
        return result;
      }).toPromise();
  }

  provisionAddress(address: Address): Promise<boolean> {
    const url = `${dispatcherApi.url}/ProvisionAddress`;
    var headers = new Headers();
    this.createHeaders(headers);

    return this.http.post(url, address.addressId, { headers: headers })
      .map(x => {
        return true;
      }).toPromise();
  }

  removeAddress(address: Address): Promise<boolean> {
    const url = `${dispatcherApi.url}/RemoveAddress/${address.addressId}`;
    return this.http.delete(url)
      .map(x => true)
      .toPromise();
  }

  createHeaders(headers: Headers) {
    headers.append('Authorization', dispatcherApi.auth);
    headers.append('Accept', 'application/json');
  }
}
