import { Component, OnInit } from '@angular/core';
import { HttpService, Results } from '../http.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  results: Results = new Results;
  films: Film[] = [];
  filmCount: number;

  constructor(private http: HttpService) {
    http.get((json) => {
      this.results = json;
      this.films = this.results.results;
      this.formatNumbers();
      this.filmCount = this.films.length;
    }, 'https://swapi.co/api/films/');
  }

  ngOnInit() {
  }

  next() {
    console.log('next: ' + this.results.next);

    if (this.results.next !== null) {
      this.http.get((json) => {
        this.results = json;
        this.films = this.results.results;
        this.formatNumbers();
        this.filmCount += this.films.length;
      }, this.results.next);
    }
  }


  previous() {
    console.log('previous: ' + this.results.previous);

    if (this.results.previous !== null) {
      this.http.get((json) => {
        this.filmCount -= this.films.length;
        this.results = json;
        this.films = this.results.results;
        this.formatNumbers();
      }, this.results.previous);
    }
  }

  formatNumbers() {
    for (const film of this.films) {
      for (let i = 0; i < film.characters.length; i++) {
        if (film.characters[i] !== null) {
          film.characters[i] = film.characters[i].replace(/[^0-9]/g, '');
        } else {
          film.characters[i] = '';
        }
      }
      film.characters.sort((a: any, b: any) => a - b);

      for (let i = 0; i < film.planets.length; i++) {
        if (film.planets[i] !== null) {
          film.planets[i] = film.planets[i].replace(/[^0-9]/g, '');
        } else {
          film.planets[i] = '';
        }
      }
      film.planets.sort((a: any, b: any) => a - b);

      for (let i = 0; i < film.starships.length; i++) {
        if (film.starships[i] !== null) {
          film.starships[i] = film.starships[i].replace(/[^0-9]/g, '');
        } else {
          film.starships[i] = '';
        }
      }
      film.starships.sort((a: any, b: any) => a - b);

      for (let i = 0; i < film.vehicles.length; i++) {
        if (film.vehicles[i] !== null) {
          film.vehicles[i] = film.vehicles[i].replace(/[^0-9]/g, '');
        } else {
          film.vehicles[i] = '';
        }
      }
      film.vehicles.sort((a: any, b: any) => a - b);

      for (let i = 0; i < film.species.length; i++) {
        if (film.species[i] !== null) {
          film.species[i] = film.species[i].replace(/[^0-9]/g, '');
        } else {
          film.species[i] = '';
        }
      }
      film.species.sort((a: any, b: any) => a - b);

      if (film.url !== null) {
        film.url = film.url.replace(/[^0-9]/g, '');
      } else {
        film.url = '';
      }
    }

    this.films.sort((a: any, b: any) => a.url - b.url);
  }
}

export class Film {
  title: string;
  episode_id: string;
  opening_crawl: string;
  director: number;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: Date;
  edited: Date;
  url: string;
}
