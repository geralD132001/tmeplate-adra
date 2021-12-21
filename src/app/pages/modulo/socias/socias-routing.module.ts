import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SociasComponent} from "./socias.component";

const routes: Routes = [
  {
    path: '',
    component: SociasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SociasRoutingModule {
}
