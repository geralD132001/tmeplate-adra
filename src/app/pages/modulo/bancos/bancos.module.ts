import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FormBancosComponent} from "./form-bancos/form-bancos.component";
import {BancosComponent} from "./bancos.component";
import {BancosRoutingModule} from "./bancos-routing.module";
import {BancoService} from "../../../providers/services/banco.service";


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
  providers: [BancoService],
})
export class BancosModule { }
