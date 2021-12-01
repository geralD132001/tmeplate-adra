import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RecursosComponent} from "./recursos.component";
import {RecursosRoutingModule} from "./recursos-routing.module";
import {RecursoService} from "../../../providers/services/recurso.service";
import { FormRecursosComponent } from './form-recursos/form-recursos.component';

@NgModule({
  declarations: [
    RecursosComponent,
    FormRecursosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecursosRoutingModule
  ],
  providers: [RecursoService],
})
export class RecursosModule { }
