import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FormPedidosComponent} from "./form-pedidos/form-pedidos.component";
import {PedidosComponent} from "./pedidos.component";
import {PedidosRoutingModule} from "./pedidos-routing.module";


@NgModule({
  declarations: [
    PedidosComponent,
    FormPedidosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PedidosRoutingModule
  ],
  providers: [],
})
export class PedidosModule { }
