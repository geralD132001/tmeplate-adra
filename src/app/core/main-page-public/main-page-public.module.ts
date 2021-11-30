import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainPagePublicComponent} from "./main-page-public.component";
import {MainPagePublicRoutingModule} from "./main-page-public-routing.module";

@NgModule({
  declarations: [
    MainPagePublicComponent,
  ],
  imports: [
    CommonModule,
    MainPagePublicRoutingModule
  ],
  providers: [],
})
export class MainPagePublicModule { }
