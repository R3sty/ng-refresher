import { PersonsService } from './persons.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-person-input',
  templateUrl: './person-input.component.html',
  styleUrls: ['./person-input.component.css']
})

export class PersonInputComponent {

  enteredPersonName = '';

  constructor(private PersonsService: PersonsService) { };

  onCreatePerson(personName: string) {
    console.log(personName + " created");
    this.PersonsService.addPerson(this.enteredPersonName);
    this.enteredPersonName = '';
  }
}
