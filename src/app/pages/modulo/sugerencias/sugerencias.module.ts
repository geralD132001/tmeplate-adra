import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FormSugerenciasComponent} from "./form-sugerencias/form-sugerencias.component";
import {SugerenciasComponent} from "./sugerencias.component";
import {SugerenciasRoutingModule} from "./sugerencias-routing.module";
import {SugerenciaService} from "../../../providers/services/sugerencia.service";


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
  providers: [SugerenciaService],
})
export class SugerenciasModule { }
