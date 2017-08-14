import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../pages';
import { Person } from '../core/person';
import { SetupService } from "../core/setup-service";

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {
  // Configuration Values hard-coded until we write Storage code.
  personInfo: Person = new Person('','');

  constructor(private setupService: SetupService,
    public navCtrl: NavController,
    public navParams: NavParams) { }

  ionViewDidLoad() {
    this.setupService.fetchPerson()
      .then(p => {
        this.personInfo = p;
      })
      .catch(e => {
        console.error(e);
      });
  }

  setInfo() {
    this.setupService.setPerson(this.personInfo)
      .then(() => this.navCtrl.setRoot(HomePage))
      .catch((e) => console.error(e));
  }
}
