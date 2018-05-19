import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotfoundComponent } from './notfound/notfound.component';
import { PeopleComponent } from './people/people.component';
import { IndexComponent } from './index/index.component';
import { PlanetsComponent } from './planets/planets.component';
import { StarshipsComponent } from './starships/starships.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { SpeciesComponent } from './species/species.component';
import { FilmsComponent } from './films/films.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'films', component: FilmsComponent},
  {path: 'people', component: PeopleComponent},
  {path: 'planets', component: PlanetsComponent},
  {path: 'starships', component: StarshipsComponent},
  {path: 'vehicles', component: VehiclesComponent},
  {path: 'species', component: SpeciesComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class RoutesModule { }
