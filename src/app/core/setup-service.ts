import { Injectable } from '@angular/core';
import { Person } from './person';

@Injectable()
export class SetupService {
  // Configuration Values hard-coded until we write Storage code.
  private person: Person = new Person('16035551212', 'Michael Callaghan');

  constructor() {
  }

  fetchPerson(): Promise<Person> {
    var p = Promise.resolve<Person>(this.person);
    return p;
  }

  setPerson(person: Person): Promise<Person> {
    this.person.name = person.name;
    this.person.phone = person.phone;
    return this.fetchPerson();
  }
}

