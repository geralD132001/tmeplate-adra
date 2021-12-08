import {Component, OnInit} from '@angular/core';
import {RecursoService} from "../../../providers/services/recurso.service";
import {FormRecursosComponent} from "./form-recursos/form-recursos.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';
import {Observable} from "rxjs";
import {UploadFilesService} from "../../../providers/services/upload-files.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent implements OnInit {

  selectedFiles: FileList;
  progressInfo = [];
  message = '';
  imageName = "";

  fileInfos: Observable<any>;
  recursos:any[] = [];
  constructor(private recursoService: RecursoService,
              private modalService: NgbModal,
              private uploadFilesService: UploadFilesService) { }

  ngOnInit(): void {
    this.getRecursos();
    this.fileInfos = this.uploadFilesService.getFiles();
  }

  selectFiles(event) {
    this.progressInfo = [];
    event.target.files.length == 1 ? this.imageName = event.target.files[0].name : this.imageName = event.target.files.length + " archivos";
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }


  upload(index, file) {
    this.progressInfo[index] = { value: 0, fileName: file.name };

    this.uploadFilesService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadFilesService.getFiles();
        }
      },
      err => {
        this.progressInfo[index].value = 0;
        this.message = 'No se puede subir el archivo ' + file.name;
      });
  }

  deleteFile(filename: string) {
    this.uploadFilesService.deleteFile(filename).subscribe(res => {
      this.message = res['message'];
      this.fileInfos = this.uploadFilesService.getFiles();
    });
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
