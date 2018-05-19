import { Component, OnInit } from '@angular/core';
import { HttpService, Results } from '../http.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {
  results: Results = new Results;
  planets: Planet[] = [];
  planetCount: number;

  constructor(private http: HttpService) {
    http.get((json) => {
      this.results = json;
      this.planets = this.results.results;
      this.formatNumbers();
      this.planetCount = this.planets.length;
    }, 'https://swapi.co/api/planets/');
  }

  ngOnInit() {
  }

  next() {
    console.log('next: ' + this.results.next);

    if (this.results.next !== null) {
      this.http.get((json) => {
        this.results = json;
        this.planets = this.results.results;
        this.formatNumbers();
        this.planetCount += this.planets.length;
      }, this.results.next);
    }
  }


  previous() {
    console.log('previous: ' + this.results.previous);

    if (this.results.previous !== null) {
      this.http.get((json) => {
        this.planetCount -= this.planets.length;
        this.results = json;
        this.planets = this.results.results;
        this.formatNumbers();
      }, this.results.previous);
    }
  }

  formatNumbers() {
    for (const planet of this.planets) {
      if (planet.rotation_period !== null) {
        planet.rotation_period = planet.rotation_period.replace(/[^0-9]/g, '');
      } else {
        planet.rotation_period = '';
      }

      if (planet.orbital_period !== null) {
        planet.orbital_period = planet.orbital_period.replace(/[^0-9]/g, '');
      } else {
        planet.orbital_period = '';
      }

      if (planet.diameter !== null) {
        planet.diameter = planet.diameter.replace(/[^0-9]/g, '');
      } else {
        planet.diameter = '';
      }

      if (planet.surface_water !== null) {
        planet.surface_water = planet.surface_water.replace(/[^0-9]/g, '');
      } else {
        planet.surface_water = '';
      }

      if (planet.population !== null) {
        planet.population = planet.population.replace(/[^0-9]/g, '');
      } else {
        planet.population = '';
      }

      for (let i = 0; i < planet.residents.length; i++) {
        if (planet.residents[i] !== null) {
          planet.residents[i] = planet.residents[i].replace(/[^0-9]/g, '');
        } else {
          planet.residents[i] = '';
        }
      }
      planet.residents.sort((a: any, b: any) => a - b);

      for (let i = 0; i < planet.films.length; i++) {
        if (planet.films[i] !== null) {
          planet.films[i] = planet.films[i].replace(/[^0-9]/g, '');
        } else {
          planet.films[i] = '';
        }
      }
      planet.films.sort((a: any, b: any) => a - b);

      if (planet.url !== null) {
        planet.url = planet.url.replace(/[^0-9]/g, '');
      } else {
        planet.url = '';
      }
    }

    this.planets.sort((a: any, b: any) => a.url - b.url);
  }
}

export class Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}
