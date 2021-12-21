import { Component, OnInit } from '@angular/core';
import {SociaService} from "../../../providers/services/socia.service";
import {FormSociasComponent} from "./form-socias/form-socias.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-socias',
  templateUrl: './socias.component.html',
  styleUrls: ['./socias.component.css']
})
export class SociasComponent implements OnInit {

  socias: any [] = [];
  constructor(private sociaService: SociaService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getSocias();
  }

  getSocias(): void {
    this.sociaService.getAll$().subscribe(response => {
      console.log(response);
      this.socias = response.data || [];
    });
  }

  openModal(): any {
    const modal = this.modalService.open(FormSociasComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nueva';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          title: 'Socia',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1500
        });
        this.getSocias();
      }
    }).catch(res => {
    });
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormSociasComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.id_socia = item.id_socia;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        this.getSocias();
        Swal.fire({
          title: 'Socia',
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
    const ID = item.idSocia;
    const mensaje = '¿ Desea eliminar el registro? ';
    if (ID) {
      Swal.fire({
        title: 'Se eliminará el registro',
        text: `${mensaje}`,
        backdrop: true,
        //animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Estoy de acuerdo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.sociaService.delete$(ID).subscribe(data => {
            if (data.success) {
              Swal.fire({
                title: 'Eliminado',
                text: data.message,
                backdrop: true,
                showConfirmButton: false,
                confirmButtonColor: '#7f264a',
                timer: 1500,
              });
              this.getSocias();
            }
          });
        }
      });
    }
  }
}
