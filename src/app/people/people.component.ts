import { Component, OnInit } from '@angular/core';
import { HttpService, Results } from '../http.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  results: Results = new Results;
  people: Person[] = [];
  peopleCount: number;

  constructor(private http: HttpService) {
    http.get((json) => {
      this.results = json;
      this.people = this.results.results;
      this.peopleCount = this.people.length;
    }, 'https://swapi.co/api/people/');
  }

  ngOnInit() {
  }

  next() {
    console.log('next: ' + this.results.next);

    if (this.results.next !== null) {
      this.http.get((json) => {
        this.results = json;
        this.people = this.results.results;
        this.peopleCount += this.people.length;
      }, this.results.next);
    }
  }


  previous() {
    console.log('previous: ' + this.results.previous);

    if (this.results.previous !== null) {
      this.http.get((json) => {
        this.peopleCount -= this.people.length;
        this.results = json;
        this.people = this.results.results;
      }, this.results.previous);
    }
  }

}

export class Person {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}
