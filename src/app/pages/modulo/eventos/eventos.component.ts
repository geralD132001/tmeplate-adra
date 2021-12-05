import { Component, OnInit } from '@angular/core';
import {EventoService} from "../../../providers/services/evento.service";
import {FormEventosComponent} from "./form-eventos/form-eventos.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: any[]= [];
  constructor(private eventoService: EventoService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getEventos();
  }
  getEventos(): void {
    this.eventoService.getAll$().subscribe(response => {
      console.log(response);
      this.eventos = response.data || [];
    });
  }

  openModal(): any {
    const modal = this.modalService.open(FormEventosComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nueva';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          title: 'Eventos',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1500
        });
        this.getEventos();
      }
    }).catch(res => {
    });
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormEventosComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.id_evento = item.id_evento;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        this.getEventos();
        Swal.fire({
          title: 'Evento',
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
    const ID = item.idEvento;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.nombreEvento;
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
          this.eventoService.delete$(ID).subscribe(data => {
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
              this.getEventos();
            }
          });
        }
      });
    }
  }
}
