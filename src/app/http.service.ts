import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {}

  get(callback: Function, address: string): void {
    if (address !== null) {
      this.http.get(address).subscribe((json: Results) => {

        callback(json);
      });
    }
  }
}

export class Results {
  count: number;
  next: string;
  previous: string;
  results: any[] = [];
}
