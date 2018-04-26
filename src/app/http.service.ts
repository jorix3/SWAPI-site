import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeopleList } from './people/people.component';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {}

  getPeople(callback: Function): void {
    this.http.get('https://swapi.co/api/people/').subscribe((jsonObject: PeopleList) => {

      callback(jsonObject.results);
    });
  }
}
