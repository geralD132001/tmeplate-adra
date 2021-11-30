import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RecursosComponent} from "./recursos.component";
import {RecursosRoutingModule} from "./recursos-routing.module";
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
  providers: [],
})
export class RecursosModule { }
