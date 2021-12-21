import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RecursosComponent} from "./recursos.component";
import {RecursosRoutingModule} from "./recursos-routing.module";
import {RecursoService} from "../../../providers/services/recurso.service";
import { FormRecursosComponent } from './form-recursos/form-recursos.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {NbSelectModule} from "@nebular/theme";
import {SesionService} from "../../../providers/services/sesion.service";
import {CapacitacionService} from "../../../providers/services/capacitacion.service";
import {CapacitacionesComponent} from "../capacitaciones/capacitaciones.component";
import {SesionesComponent} from "../sesiones/sesiones.component";

@NgModule({
  declarations: [
    RecursosComponent,
    FormRecursosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecursosRoutingModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    NbSelectModule,

  ],
  providers: [RecursoService,CapacitacionService],
})
export class RecursosModule { }
