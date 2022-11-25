import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from 'rxjs';
@Injectable({providedIn:'root'})

export class PersonsService {
  personsChanged = new Subject<string[]>();
  public persons: string[] = [];

  constructor(private http: HttpClient) { }

  fetchPersons() {
    this.http
      .get<any>('https://swapi.dev/api/people')
      .pipe(map(resData => {
        return resData.results.map((char: any) => char.name)
      }))
      .subscribe(transFormedData => {
        this.personsChanged.next(transFormedData);
        console.log("Transformed data--->",transFormedData);
      });
  }

  addPerson(name: string) {
    this.persons.push(name);
    this.personsChanged.next(this.persons);
    //console.log(this.persons)
  }

  removePerson(name: string) {
    this.persons = this.persons.filter(person => { return person !== name; })
    this.personsChanged.next(this.persons);
    console.log("this.persons--->", this.persons)
  }
}
