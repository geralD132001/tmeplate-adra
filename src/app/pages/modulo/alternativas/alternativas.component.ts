import { Component, OnInit } from '@angular/core';
import {AlternativaService} from "../../../providers/services/alternativa.service";
import {FormAlternativasComponent} from "./form-alternativas/form-alternativas.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alternativas',
  templateUrl: './alternativas.component.html',
  styleUrls: ['./alternativas.component.css']
})
export class AlternativasComponent implements OnInit {

  alternativas: any[] = [];
  constructor(private alternativaService: AlternativaService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAlternativas();
  }

  getAlternativas(): void {
    this.alternativaService.getAll$().subscribe(response => {
      console.log(response);
      this.alternativas = response.data || [];
    });
  }

  openModal(): any {
    const modal = this.modalService.open(FormAlternativasComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });

    modal.componentInstance.title = 'Nueva';
    modal.result.then(res => {
      if (res.success) {
        // @ts-ignore
        Swal.fire({
          title: 'Alternativa',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1500
        });
        this.getAlternativas();
      }
    }).catch(res => {
    });
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormAlternativasComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });

    modal.componentInstance.id_alternativa = item.id_alternativa;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        this.getAlternativas();
        Swal.fire({
          title: 'Alternativa',
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
    const ID = item.idAlternativa;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.nombreAlternativa;
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
          this.alternativaService.delete$(ID).subscribe(data => {
            if (data.success) {
              Swal.fire({
                title: 'Eliminado',
                text: data.message,
                backdrop: true,
                showConfirmButton: false,
                confirmButtonColor: '#7f264a',
                timer: 1500,
              });
              this.getAlternativas();
            }
          });
        }
      });
    }
  }
}
