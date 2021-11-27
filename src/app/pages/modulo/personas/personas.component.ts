import { Component, OnInit } from '@angular/core';
import {PersonaService} from "../../../providers/services/persona.service";
import {FormPersonasComponent} from "./form-personas/form-personas.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: any [] = [];
  constructor(private personaService: PersonaService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPersonas();
  }
  getPersonas(): void {
    this.personaService.getAll$().subscribe(response => {
      console.log(response);
      this.personas = response.data || [];
    });
  }

  openModal(): any {
    const modal = this.modalService.open(FormPersonasComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    // modal.componentInstance.arreglo = item;
    modal.componentInstance.title = 'Nueva';
    modal.result.then(res => {
      if (res.success) {
        // @ts-ignore
        Swal.fire({
          title: 'Persona',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1500
        });
        this.getPersonas();
      }
    }).catch(res => {
    });
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormPersonasComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.id_persona = item.id_persona;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        this.getPersonas();
        Swal.fire({
          title: 'Persona',
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
    const ID = item.idPersona;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.nombrePersona;
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
          this.personaService.delete$(ID).subscribe(data => {
            if (data.success) {
              Swal.fire({
                title: 'Eliminada',
                text: data.message,
                backdrop: true,
                //animation: true,
                showConfirmButton: false,
                confirmButtonColor: '#7f264a',
                timer: 1500,
              });
              this.getPersonas();
            }
          });
        }
      });
    }
  }
}
