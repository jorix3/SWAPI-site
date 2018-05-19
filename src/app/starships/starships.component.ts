import { Component, OnInit } from '@angular/core';
import { HttpService, Results } from '../http.service';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit {
  results: Results = new Results;
  starships: Starship[] = [];
  starshipCount: number;

  constructor(private http: HttpService) {
    http.get((json) => {
      this.results = json;
      this.starships = this.results.results;
      this.formatNumbers();
      this.starshipCount = this.starships.length;
    }, 'https://swapi.co/api/starships/');
  }

  ngOnInit() {
  }

  next() {
    console.log('next: ' + this.results.next);

    if (this.results.next !== null) {
      this.http.get((json) => {
        this.results = json;
        this.starships = this.results.results;
        this.formatNumbers();
        this.starshipCount += this.starships.length;
      }, this.results.next);
    }
  }


  previous() {
    console.log('previous: ' + this.results.previous);

    if (this.results.previous !== null) {
      this.http.get((json) => {
        this.starshipCount -= this.starships.length;
        this.results = json;
        this.starships = this.results.results;
        this.formatNumbers();
      }, this.results.previous);
    }
  }

  formatNumbers() {
    for (const starship of this.starships) {
      if (starship.cost_in_credits !== null) {
        starship.cost_in_credits = starship.cost_in_credits.replace(/[^0-9]/g, '');
      } else {
        starship.cost_in_credits = '';
      }

      if (starship.length !== null) {
        starship.length = starship.length.replace(/[^0-9]/g, '');
      } else {
        starship.length = '';
      }

      if (starship.max_atmosphering_speed !== null) {
        starship.max_atmosphering_speed = starship.max_atmosphering_speed.replace(/[^0-9]/g, '');
      } else {
        starship.max_atmosphering_speed = '';
      }

      if (starship.crew !== null) {
        starship.crew = starship.crew.replace(/[^0-9]/g, '');
      } else {
        starship.crew = '';
      }

      if (starship.passengers !== null) {
        starship.passengers = starship.passengers.replace(/[^0-9]/g, '');
      } else {
        starship.passengers = '';
      }

      if (starship.cargo_capacity !== null) {
        starship.cargo_capacity = starship.cargo_capacity.replace(/[^0-9]/g, '');
      } else {
        starship.cargo_capacity = '';
      }

      if (starship.MGLT !== null) {
        starship.MGLT = starship.MGLT.replace(/[^0-9]/g, '');
      } else {
        starship.MGLT = '';
      }

      for (let i = 0; i < starship.pilots.length; i++) {
        if (starship.pilots[i] !== null) {
          starship.pilots[i] = starship.pilots[i].replace(/[^0-9]/g, '');
        } else {
          starship.pilots[i] = '';
        }
      }
      starship.pilots.sort((a: any, b: any) => a - b);

      for (let i = 0; i < starship.films.length; i++) {
        if (starship.films[i] !== null) {
          starship.films[i] = starship.films[i].replace(/[^0-9]/g, '');
        } else {
          starship.films[i] = '';
        }
      }
      starship.films.sort((a: any, b: any) => a - b);

      if (starship.url !== null) {
        starship.url = starship.url.replace(/[^0-9]/g, '');
      } else {
        starship.url = '';
      }
    }

    this.starships.sort((a: any, b: any) => a.url - b.url);
  }
}

export class Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}
