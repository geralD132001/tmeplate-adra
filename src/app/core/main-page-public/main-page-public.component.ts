import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../providers/services/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormPedidosComponent} from "../../pages/usuarios/pedidos/form-pedidos/form-pedidos.component";

@Component({
  selector: 'app-main-page-public',
  templateUrl: './main-page-public.component.html',
  styleUrls: ['./main-page-public.component.css']
})
export class MainPagePublicComponent implements OnInit {
  closeResult: string
  test : Date = new Date();
  public isCollapsed = true;
  autorizado: boolean;
  auth: any;
  focus: any;
  focus1: any;
  constructor(public authService: AuthService,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.autorizado = this.authService.isAuthenticated();
    this.auth = this.authService;
  }
  getPath(){
    return this.router.url;
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

      }
    }).catch(res => {
    });
  }


}
