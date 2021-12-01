import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AlternativasComponent} from "./alternativas.component";

const routes: Routes = [
  {
    path: '',
    component: AlternativasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlternativasRoutingModule {
}
