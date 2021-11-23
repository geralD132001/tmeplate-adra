import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CapacitacionesComponent} from "./capacitaciones.component";

const routes: Routes = [
  {
    path: '',
    component: CapacitacionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapacitacionesRoutingModule {
}
