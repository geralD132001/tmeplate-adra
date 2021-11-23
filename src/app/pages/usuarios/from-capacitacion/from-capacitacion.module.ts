import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FromCapacitacionComponent} from "./from-capacitacion.component";
import {FromCapacitacionRoutingModule} from "./from-capacitacion-routing.module";


@NgModule({
  declarations: [
    FromCapacitacionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FromCapacitacionRoutingModule
  ],
  providers: [],
})
export class FromCapacitacionModule { }
