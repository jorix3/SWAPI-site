import { Component, OnInit } from '@angular/core';
import { HttpService, Results } from '../http.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  results: Results = new Results;
  vehicles: Vehicle[] = [];
  vehicleCount: number;

  constructor(private http: HttpService) {
    http.get((json) => {
      this.results = json;
      this.vehicles = this.results.results;
      this.formatNumbers();
      this.vehicleCount = this.vehicles.length;
    }, 'https://swapi.co/api/vehicles/');
  }

  ngOnInit() {
  }

  next() {
    console.log('next: ' + this.results.next);

    if (this.results.next !== null) {
      this.http.get((json) => {
        this.results = json;
        this.vehicles = this.results.results;
        this.formatNumbers();
        this.vehicleCount += this.vehicles.length;
      }, this.results.next);
    }
  }


  previous() {
    console.log('previous: ' + this.results.previous);

    if (this.results.previous !== null) {
      this.http.get((json) => {
        this.vehicleCount -= this.vehicles.length;
        this.results = json;
        this.vehicles = this.results.results;
        this.formatNumbers();
      }, this.results.previous);
    }
  }

  formatNumbers() {
    for (const vehicle of this.vehicles) {
      if (vehicle.cost_in_credits !== null) {
        vehicle.cost_in_credits = vehicle.cost_in_credits.replace(/[^0-9]/g, '');
      } else {
        vehicle.cost_in_credits = '';
      }

      if (vehicle.length !== null) {
        vehicle.length = vehicle.length.replace(/[^0-9]/g, '');
      } else {
        vehicle.length = '';
      }

      if (vehicle.max_atmosphering_speed !== null) {
        vehicle.max_atmosphering_speed = vehicle.max_atmosphering_speed.replace(/[^0-9]/g, '');
      } else {
        vehicle.max_atmosphering_speed = '';
      }

      if (vehicle.crew !== null) {
        vehicle.crew = vehicle.crew.replace(/[^0-9]/g, '');
      } else {
        vehicle.crew = '';
      }

      if (vehicle.passengers !== null) {
        vehicle.passengers = vehicle.passengers.replace(/[^0-9]/g, '');
      } else {
        vehicle.passengers = '';
      }

      if (vehicle.cargo_capacity !== null) {
        vehicle.cargo_capacity = vehicle.cargo_capacity.replace(/[^0-9]/g, '');
      } else {
        vehicle.cargo_capacity = '';
      }

      for (let i = 0; i < vehicle.pilots.length; i++) {
        if (vehicle.pilots[i] !== null) {
          vehicle.pilots[i] = vehicle.pilots[i].replace(/[^0-9]/g, '');
        } else {
          vehicle.pilots[i] = '';
        }
      }
      vehicle.pilots.sort((a: any, b: any) => a - b);

      for (let i = 0; i < vehicle.films.length; i++) {
        if (vehicle.films[i] !== null) {
          vehicle.films[i] = vehicle.films[i].replace(/[^0-9]/g, '');
        } else {
          vehicle.films[i] = '';
        }
      }
      vehicle.films.sort((a: any, b: any) => a - b);

      if (vehicle.url !== null) {
        vehicle.url = vehicle.url.replace(/[^0-9]/g, '');
      } else {
        vehicle.url = '';
      }
    }

    this.vehicles.sort((a: any, b: any) => a.url - b.url);
  }
}

export class Vehicle {
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
  vehicle_class: string;
  pilots: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}
