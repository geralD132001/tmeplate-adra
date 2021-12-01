import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PreguntasComponent} from "./preguntas.component";

const routes: Routes = [
  {
    path: '',
    component: PreguntasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreguntasRoutingModule {
}
