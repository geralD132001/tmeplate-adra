import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FormPedidosComponent} from "./form-pedidos/form-pedidos.component";
import {PedidosComponent} from "./pedidos.component";
import {PedidosRoutingModule} from "./pedidos-routing.module";
import {PedidoService} from "../../../providers/services/pedido.service";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatTableExporterModule} from "mat-table-exporter";


@NgModule({
  declarations: [
    PedidosComponent,
    FormPedidosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PedidosRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatTableExporterModule
  ],
  providers: [PedidoService],
})
export class PedidosModule { }
