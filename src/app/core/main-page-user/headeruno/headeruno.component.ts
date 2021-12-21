import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../providers/services/auth.service";
import Swal from 'sweetalert2';
import {FormPedidosComponent} from "../../../pages/usuarios/pedidos/form-pedidos/form-pedidos.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PedidoService} from "../../../providers/services/pedido.service";

@Component({
  selector: 'app-headeruno',
  templateUrl: './headeruno.component.html',
  styleUrls: ['./headeruno.component.css']
})
export class HeaderunoComponent implements OnInit {
  public isCollapsed = true;
  autorizado: boolean;
  pedidos: any [] = [];
  auth: any;
  focus: any;
  focus1: any;
  constructor( public authService: AuthService,
               private modalService: NgbModal,
               private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.getPedidos();
    this.autorizado = this.authService.isAuthenticated();
    this.auth = this.authService;
  }


  getPedidos(){
    this.pedidoService.getAll$().subscribe(response => {
      console.log(response);
      this.pedidos = response.data || [];
    });
  }
  logout(): void {
    // let username = this.authService.usuario.username;
    Swal.fire('Logout', `Hola ${this.auth.usuario.username}, has cerrado sesión con éxito!`, 'success');
    this.authService.logout();
    //this.autorizado = false;
    //this.auth = [];
    location.reload();
    //this.router.navigate(['**']);
  }

  openModal(): any {
    const modal = this.modalService.open(FormPedidosComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          title: 'Pedido',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1500
        });
        this.getPedidos();
      }
    }).catch(res => {
    });
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormPedidosComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.id_pedido = item.id_pedido;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        this.getPedidos();
        Swal.fire({
          title: 'Pedido',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1500
        });
      }
    }).catch(res => {
    });
  }

  public onDelete(item: any): void {
    const ID = item.idPedido;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.descripcionOracion;
    if (ID) {
      Swal.fire({
        title: 'Se eliminará el registro',
        text: `${mensaje}`,
        backdrop: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Estoy de acuerdo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.pedidoService.delete$(ID).subscribe(data => {
            if (data.success) {
              Swal.fire({
                title: 'Eliminado',
                text: data.message,
                backdrop: true,
                //animation: true,
                showConfirmButton: false,
                confirmButtonColor: '#7f264a',
                timer: 1500,
              });
              this.getPedidos();
            }
          });
        }
      });
    }
  }
}
