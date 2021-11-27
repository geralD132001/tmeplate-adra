import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FormBancosComponent} from "./form-bancos/form-bancos.component";
import {BancosComponent} from "./bancos.component";
import {BancosRoutingModule} from "./bancos-routing.module";


@NgModule({
  declarations: [
    BancosComponent,
    FormBancosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BancosRoutingModule
  ],
  providers: [],
})
export class BancosModule { }
