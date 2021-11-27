import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FormCapacitacionesComponent} from "./form-capacitaciones/form-capacitaciones.component";
import {CapacitacionesComponent} from "./capacitaciones.component";
import {CapacitacionesRoutingModule} from "./capacitaciones-routing.module";

@NgModule({
  declarations: [
    CapacitacionesComponent,
    FormCapacitacionesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CapacitacionesRoutingModule
  ],
  providers: [],
})
export class CapacitacionesModule { }
