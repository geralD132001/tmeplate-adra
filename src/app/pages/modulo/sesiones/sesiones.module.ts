import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FormSesionesComponent} from "./form-sesiones/form-sesiones.component";
import {SesionesComponent} from "./sesiones.component";
import {SesionesRoutingModule} from "./sesiones-routing.module";
import {SesionService} from "../../../providers/services/sesion.service";



@NgModule({
  declarations: [
    SesionesComponent,
    FormSesionesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SesionesRoutingModule
  ],
  providers: [SesionService],
})
export class SesionesModule { }
