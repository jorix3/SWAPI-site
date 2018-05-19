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
      this.formatNumbers();
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
        this.formatNumbers();
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
        this.formatNumbers();
      }, this.results.previous);
    }
  }

  formatNumbers() {
    for (const person of this.people) {
      if (person.height !== null) {
        person.height = person.height.replace(/[^0-9]/g, '');
      } else {
        person.height = '';
      }

      if (person.mass !== null) {
        person.mass = person.mass.replace(/[^0-9]/g, '');
      } else {
        person.mass = '';
      }

      if (person.homeworld !== null) {
        person.homeworld = person.homeworld.replace(/[^0-9]/g, '');
      } else {
        person.homeworld = '';
      }

      for (let i = 0; i < person.films.length; i++) {
        if (person.films[i] !== null) {
          person.films[i] = person.films[i].replace(/[^0-9]/g, '');
        } else {
          person.films[i] = '';
        }
      }
      person.films.sort((a: any, b: any) => a - b);

      for (let i = 0; i < person.species.length; i++) {
        if (person.species[i] !== null) {
          person.species[i] = person.species[i].replace(/[^0-9]/g, '');
        } else {
          person.species[i] = '';
        }
      }
      person.species.sort((a: any, b: any) => a - b);

      for (let i = 0; i < person.vehicles.length; i++) {
        if (person.vehicles[i] !== null) {
          person.vehicles[i] = person.vehicles[i].replace(/[^0-9]/g, '');
        } else {
          person.vehicles[i] = '';
        }
      }
      person.vehicles.sort((a: any, b: any) => a - b);

      for (let i = 0; i < person.starships.length; i++) {
        if (person.starships[i] !== null) {
          person.starships[i] = person.starships[i].replace(/[^0-9]/g, '');
        } else {
          person.starships[i] = '';
        }
      }
      person.starships.sort((a: any, b: any) => a - b);

      if (person.url !== null) {
        person.url = person.url.replace(/[^0-9]/g, '');
      } else {
        person.url = '';
      }
    }

    this.people.sort((a: any, b: any) => a.url - b.url);
  }
}

export class Person {
  name: string;
  height: string;
  mass: string;
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
