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
      }, this.results.previous);
    }
  }

}

export class Planet {
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: number;
  population: number;
  residents: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}
