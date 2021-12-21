import { Component,Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {RecursoService} from "../../../../providers/services/recurso.service";
import {SesionService} from "../../../../providers/services/sesion.service";
import {TiporecursoService} from "../../../../providers/services/tiporecurso.service";
import {Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-form-recursos',
  templateUrl: './form-recursos.component.html',
  styleUrls: ['./form-recursos.component.css']
})
export class FormRecursosComponent implements OnInit {


  selectedFiles: FileList;
  progressInfo = [];
  message = '';
  imageName = "";
  fileInfos: Observable<any>;
  sesiones: any [] = [];
  tiposRecursos: any[] = [];
  @Input() item: any;
  @Input() id_recurso: any;
  @Input() title: any;
  idRecurso: string;
  isUpdating: boolean;
  formGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private recursoService: RecursoService,
              private sesionService: SesionService,
              private tipoRecursoService: TiporecursoService) { }

  ngOnInit(): void {
    this.fileInfos = this.recursoService.getFiles();
    this.inicio();
    this.getSesiones();
    this.getTiporecursos();
    this.isUpdating = false;
    if (this.item) {
      this.updateData();
    } else {
      this.item = [];
      this.id_recurso = '';
    }
    console.log(this.item);
  }



  getTiporecursos(): void {
    this.tipoRecursoService.getAll$().subscribe(response => {
      this.tiposRecursos = response.data || [];
    });
  }
  getSesiones(): void {
    this.sesionService.getAll$().subscribe(response => {
      this.sesiones = response.data || [];
    });
  }
  private inicio(): any {
    const controls = {
      nombreRecurso: ['', [Validators.required]],
      url: ['', [Validators.required]],
      name : [''],
      fechaInicioRecurso: [''],
      fechaFinRecurso: [''],
      estadoRecurso: [''],
      idSesion: [''],
      idTiporecur:[''],
    };
    this.formGroup = this.formBuilder.group(controls);
  }

  save(name: any): void {
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }

    const save: any = {
      nombreRecurso: name.nombreRecurso,
      url: name.url,
      name: name.name,
      fechaInicioRecurso: name.fechaInicioRecurso,
      fechaFinRecurso: name.fechaFinRecurso,
      estadoRecurso: name.estadoRecurso,
      sesion: {
        idSesion: name.idSesion
      },
      tiporecurso: {
        idTiporecur: name.idTiporecur
      }
    };

    this.recursoService.add$(save).subscribe(response => {
      if (response.success) {
        this.activeModal.close({ success: true, message: response.message });
      } else {
      }
    }, () => { }, () => {  });
  }

  update(name: any): void {
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }

    const save: any = {
      idRecurso: this.idRecurso,
      nombreRecurso: name.nombreRecurso,
      url: name.url,
      name: name.name,
      fechaInicioRecurso: name.fechaInicioRecurso,
      fechaFinRecurso: name.fechaFinRecurso,
      estadoRecurso: name.estadoRecurso,
      sesion: {
        idSesion: name.idSesion
      },
      tiporecurso: {
        idTiporecur: name.idTiporecur
      }
    }

    this.recursoService.update$(this.idRecurso, save).subscribe(response => {
      if (response.success) {
        this.activeModal.close({ success: true, message: response.message });
      } else {
      }
    }, () => { }, () => {  });
  }

  updateData(): any {
    const data = this.item;
    this.isUpdating = true;
    this.idRecurso = data.idRecurso;
    this.formGroup.patchValue({
      nombreRecurso: data.nombreRecurso,
      url: data.url,
      name: data.name,
      fechaInicioRecurso: data.fechaInicioRecurso,
      fechaFinRecurso: data.fechaFinRecurso,
      estadoRecurso: data.estadoRecurso,
      idSesion: data.idSesion,
      idTiporecur: data.idTiporecur
    });
  }

  public func() {
    this.activeModal.close();
  }

  validaForm(campo: string) {
    return this.formGroup.controls[campo].errors &&
      this.formGroup.controls[campo].touched;
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

    this.recursoService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.recursoService.getFiles();
        }
      },
      err => {
        this.progressInfo[index].value = 0;
        this.message = 'No se puede subir el archivo ' + file.name;
      });
  }

  deleteFile(filename: string) {
    this.recursoService.deleteFile(filename).subscribe(res => {
      this.message = res['message'];
      this.fileInfos = this.recursoService.getFiles();
    });
  }
}
