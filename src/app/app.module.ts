import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { RouterModule, Routes } from '@angular/router';
import { RoutesModule } from './routes.module';


import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PeopleComponent } from './people/people.component';
import { IndexComponent } from './index/index.component';
import { PlanetsComponent } from './planets/planets.component';
import { StarshipsComponent } from './starships/starships.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { SpeciesComponent } from './species/species.component';
import { FilmsComponent } from './films/films.component';


@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    PeopleComponent,
    IndexComponent,
    PlanetsComponent,
    StarshipsComponent,
    VehiclesComponent,
    SpeciesComponent,
    FilmsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutesModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
