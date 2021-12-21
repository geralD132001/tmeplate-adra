import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TiporecursosComponent} from "./tiporecursos.component";

const routes: Routes = [
  {
    path: '',
    component: TiporecursosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposrecursosRoutingModule {
}
