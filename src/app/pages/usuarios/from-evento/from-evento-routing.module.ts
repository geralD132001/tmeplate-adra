import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FromEventoComponent} from "./from-evento.component";

const routes: Routes = [
  {
    path: '',
    component: FromEventoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FromEventoRoutingModule {
}
