import {Component, OnInit} from '@angular/core';
import {RecursoService} from "../../../providers/services/recurso.service";
import {FormRecursosComponent} from "./form-recursos/form-recursos.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GeneralService} from "../../../providers/general.service";
import {SesionService} from "../../../providers/services/sesion.service";
import {CapacitacionService} from "../../../providers/services/capacitacion.service";



@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent implements OnInit {

  recursos: any[] = [];
  formsFilter: FormGroup;
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

  /*private initFormFields(): void{
     const controls = {
       id_capacitacion: [''],
       id_Sesion: [''],
     };
     this.formsFilter = this.formBuilder.group(controls);
   }
 */

 /*listCapacitaciones(): void{

    this.capacitacionService.getAll$().subscribe(
      capacitacion => {
        this.capacitaciones = capacitacion.data || [];
        this.capacitaciones.map( a =>{
          const ab = a.selection;
          if(ab === '1'){
            const idSection: any = this.capacitaciones.find( c =>{
              return c.selection === ab;
            });
            this.formsFilter.patchValue({id_capacitacion: idSection.id_capacitacion});
          }
        });
      }
    );
  }
*/
/*anySesions(capacitaciones) : void{
 console.log(capacitaciones);
 this.sesiones = [];
 this.formsFilter.patchValue({id_sesion: ''});
 this.sesionService.getAll$().subscribe(
   sesion =>{
     this.sesiones = sesion.data || [];
     if(this.sesiones.length > 0){
       this.sesiones.map(d =>{
         const abc = d.selection;
         if(abc === '1'){
           const idSection: any = this.sesiones.find( e => {
             return e.selection === abc;
           });
           this.formsFilter.patchValue({id_sesion: idSection.id_sesion});
         }
       })
     }
   }
 );
}
*/




}
