import { Component, OnInit } from '@angular/core';
import { HttpService, Results } from '../http.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {
  results: Results = new Results;
  species: Specie[] = [];
  specieCount: number;

  constructor(private http: HttpService) {
    http.get((json) => {
      this.results = json;
      this.species = this.results.results;
      this.formatNumbers();
      this.specieCount = this.species.length;
    }, 'https://swapi.co/api/species/');
  }

  ngOnInit() {
  }

  next() {
    console.log('next: ' + this.results.next);

    if (this.results.next !== null) {
      this.http.get((json) => {
        this.results = json;
        this.species = this.results.results;
        this.formatNumbers();
        this.specieCount += this.species.length;
      }, this.results.next);
    }
  }


  previous() {
    console.log('previous: ' + this.results.previous);

    if (this.results.previous !== null) {
      this.http.get((json) => {
        this.specieCount -= this.species.length;
        this.results = json;
        this.species = this.results.results;
        this.formatNumbers();
      }, this.results.previous);
    }
  }

  formatNumbers() {
    for (const specie of this.species) {
      if (specie.average_height !== null) {
        specie.average_height = specie.average_height.replace(/[^0-9]/g, '');
      } else {
        specie.average_height = '';
      }

      if (specie.average_lifespan !== null) {
        specie.average_lifespan = specie.average_lifespan.replace(/[^0-9]/g, '');
      } else {
        specie.average_lifespan = '';
      }

      if (specie.homeworld !== null) {
        specie.homeworld = specie.homeworld.replace(/[^0-9]/g, '');
      } else {
        specie.homeworld = '';
      }

      for (let i = 0; i < specie.people.length; i++) {
        if (specie.people[i] !== null) {
          specie.people[i] = specie.people[i].replace(/[^0-9]/g, '');
        } else {
          specie.people[i] = '';
        }
      }
      specie.people.sort((a: any, b: any) => a - b);

      for (let i = 0; i < specie.films.length; i++) {
        if (specie.films[i] !== null) {
          specie.films[i] = specie.films[i].replace(/[^0-9]/g, '');
        } else {
          specie.films[i] = '';
        }
      }
      specie.films.sort((a: any, b: any) => a - b);

      if (specie.url !== null) {
        specie.url = specie.url.replace(/[^0-9]/g, '');
      } else {
        specie.url = '';
      }
    }

    this.species.sort((a: any, b: any) => a.url - b.url);
  }
}

export class Specie {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}
