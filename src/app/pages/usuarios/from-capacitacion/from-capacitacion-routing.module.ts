import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FromCapacitacionComponent} from "./from-capacitacion.component";

const routes: Routes = [
  {
    path: '',
    component: FromCapacitacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FromCapacitacionRoutingModule {
}
