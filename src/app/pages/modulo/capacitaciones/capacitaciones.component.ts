import { Component, OnInit } from '@angular/core';
import {CapacitacionService} from "../../../providers/services/capacitacion.service";
import {FormCapacitacionesComponent} from "./form-capacitaciones/form-capacitaciones.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-capacitaciones',
  templateUrl: './capacitaciones.component.html',
  styleUrls: ['./capacitaciones.component.css']
})
export class CapacitacionesComponent implements OnInit {

  capacitaciones: any[]= [];
  constructor(private capacitacionService: CapacitacionService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCapacitaciones();
  }
  getCapacitaciones(): void {
    this.capacitacionService.getAll$().subscribe(response => {
      console.log(response);
      this.capacitaciones = response.data || [];
    });
  }

  openModal(): any {
    const modal = this.modalService.open(FormCapacitacionesComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nueva';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          title: 'Capacitacion',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1500
        });
        this.getCapacitaciones();
      }
    }).catch(res => {
    });
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormCapacitacionesComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.id_capacitacion = item.id_capacitacion;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        this.getCapacitaciones();
        Swal.fire({
          title: 'Capacitacion',
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
    const ID = item.idCapacitacion;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.nombreCapacitacion;
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
          this.capacitacionService.delete$(ID).subscribe(data => {
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
              this.getCapacitaciones();
            }
          });
        }
      });
    }
  }
}
