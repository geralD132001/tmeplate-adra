import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPagePublicComponent} from "./main-page-public.component";
const routes: Routes = [
  {
    path: '',
    component: MainPagePublicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPagePublicRoutingModule {
}
