import { Component, OnInit } from '@angular/core';
import {RecursoService} from "../../../providers/services/recurso.service";
import {FormRecursosComponent} from "./form-recursos/form-recursos.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent implements OnInit {

  recursos:any[] = [];
  constructor(private recursoService: RecursoService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getRecursos();
  }
  getRecursos(): void {
    this.recursoService.getAll$().subscribe(response => {
      console.log(response);
      this.recursos = response.data || [];
    });
  }

  openModal(): any {
    const modal = this.modalService.open(FormRecursosComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
    modal.result.then(res => {
      if (res.success) {
        // @ts-ignore
        Swal.fire({
          title: 'Recurso',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1500
        });
        this.getRecursos();
      }
    }).catch(res => {
    });
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormRecursosComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.id_recurso = item.id_recurso;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        this.getRecursos();
        Swal.fire({
          title: 'Recurso',
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
    const ID = item.idRecurso;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.idRecurso;
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
          this.recursoService.delete$(ID).subscribe(data => {
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
              this.getRecursos();
            }
          });
        }
      });
    }
  }
}
