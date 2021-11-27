import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FormInformesComponent} from "./form-informes/form-informes.component";
import {InformesComponent} from "./informes.component";
import {InformesRoutingModule} from "./informes-routing.module";



@NgModule({
  declarations: [
    InformesComponent,
    FormInformesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InformesRoutingModule
  ],
  providers: [],
})
export class InformesModule { }
