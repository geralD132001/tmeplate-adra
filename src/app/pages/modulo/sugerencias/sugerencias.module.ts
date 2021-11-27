import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FormSugerenciasComponent} from "./form-sugerencias/form-sugerencias.component";
import {SugerenciasComponent} from "./sugerencias.component";
import {SugerenciasRoutingModule} from "./sugerencias-routing.module";


@NgModule({
  declarations: [
    SugerenciasComponent,
    FormSugerenciasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SugerenciasRoutingModule
  ],
  providers: [],
})
export class SugerenciasModule { }
