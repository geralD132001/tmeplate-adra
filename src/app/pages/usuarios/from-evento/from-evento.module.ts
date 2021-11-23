import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FromEventoComponent} from "./from-evento.component";
import {FromEventoRoutingModule} from "./from-evento-routing.module";


@NgModule({
  declarations: [
    FromEventoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FromEventoRoutingModule
  ],
  providers: [],
})
export class FromEventoModule { }
