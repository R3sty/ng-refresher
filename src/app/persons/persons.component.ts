import { PersonsService } from './persons.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html'
})

export class PersonsComponent implements OnInit, OnDestroy {
  personList!: string[];
  isFetching = false;

  private personListSubs!: Subscription;
  //private personService: PersonsService;

  constructor(private prsService: PersonsService) {
   // this.personList = prsService.persons;
  //this.personService = prsService;
  }

  ngOnInit(): void {
    this.personListSubs =this.prsService.personsChanged.subscribe(persons => {
      this.personList = persons;
      this.isFetching = false;
    });
    this.isFetching = true;
    this.prsService.fetchPersons();

    //this.personList = this.prsService.persons;


  }

  onRemovePerson(personName: string) {
    this.prsService.removePerson(personName)
  }

  ngOnDestroy(): void {
    this.personListSubs.unsubscribe();
  }
}
