import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FormEventosComponent} from "./form-eventos/form-eventos.component";
import {EventosComponent} from "./eventos.component";
import {EventosRoutingModule} from "./eventos-routing.module";

@NgModule({
  declarations: [
    EventosComponent,
    FormEventosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EventosRoutingModule
  ],
  providers: [],
})
export class EventosModule { }
