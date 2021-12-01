import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FormPreguntasComponent} from "./form-preguntas/form-preguntas.component";
import {PreguntasComponent} from "./preguntas.component";
import {PreguntasRoutingModule} from "./preguntas-routing.module";
import {PreguntaService} from "../../../providers/services/pregunta.service";



@NgModule({
  declarations: [
    PreguntasComponent,
    FormPreguntasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PreguntasRoutingModule
  ],
  providers: [PreguntaService],
})
export class PreguntasModule { }
