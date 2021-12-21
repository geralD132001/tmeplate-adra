import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {FormPedidosComponent} from "./form-pedidos/form-pedidos.component";
import {PedidoService} from "../../../providers/services/pedido.service";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  oraciones: any [] = [];
  closeResult: string;
  constructor( private modalService: NgbModal,
               private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.getPedidos();
  }
  getPedidos(){
    this.pedidoService.getAll$().subscribe(response => {
      console.log(response);
      this.oraciones = response.data || [];
    });
  }




}
