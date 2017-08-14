import { Endpoint } from "./endpoint";

export class Address {
  // These fields come from the Dispatcher API
  public addressId: number | string = 0;
  public addressLine1: string = '';
  public addressLine2: string = '';
  public houseNumber: string = '';
  public prefixDirectional: string = '';
  public streetName: string = ''
  public community: string = '';
  public state: string = '';
  public longitude: string = '';
  public latitude: string = '';
  public postalCode: string = '';
  public zipPlusFour: string = '';
  public addressStatus: string = '';
  public endpoint: Endpoint;

  // These fields are local app enhancements
  public name: string = '';
  public lastUsed: string = '';
  public icon: string = '';
  public isProvisioned: boolean = false;

  constructor(addressLine1: string = '', addressLine2: string = '',
    community: string = '', state: string = '', postalCode: string = '',
    longitude: string = '', latitude: string = '', name: string = '', icon: string = ''
  ) {
    this.name = name;
    this.icon = icon;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.community = community;
    this.state = state;
    this.postalCode = postalCode;
    this.longitude = longitude;
    this.latitude = latitude;
  }

  toString(): string {
    let result = `${this.addressLine1||''} ${this.addressLine2||''} ${this.community||''}, ${this.state||''} ${this.postalCode||''}`;
    return result;
  }
}
