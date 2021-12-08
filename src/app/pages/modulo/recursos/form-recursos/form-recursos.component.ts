import { Component,Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {RecursoService} from "../../../../providers/services/recurso.service";
import {SesionService} from "../../../../providers/services/sesion.service";

@Component({
  selector: 'app-form-recursos',
  templateUrl: './form-recursos.component.html',
  styleUrls: ['./form-recursos.component.css']
})
export class FormRecursosComponent implements OnInit {

  recurso: any[] = [];
  sesiones: any [] = [];
  @Input() item: any;
  @Input() id_recurso: any;
  @Input() title: any;
  idRecurso: string;
  isUpdating: boolean;
  formGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private recursoService: RecursoService,
              private sesionService: SesionService) { }

  ngOnInit(): void {
    this.inicio();
    this.getSesiones();
    this.isUpdating = false;
    if (this.item) {
      this.updateData();
    } else {
      this.item = [];
      this.id_recurso = '';
    }
    console.log(this.item);
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
      fechaInicioRecurso: [''],
      fechaFinRecurso: [''],
      estadoRecurso: [''],
      idSesion: [''],
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
      fechaInicioRecurso: name.fechaInicioRecurso,
      fechaFinRecurso: name.fechaFinRecurso,
      estadoRecurso: name.estadoRecurso,
      sesion: {
        idSesion: name.idSesion
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
      fechaInicioRecurso: name.fechaInicioRecurso,
      fechaFinRecurso: name.fechaFinRecurso,
      estadoRecurso: name.estadoRecurso,
      sesion: {
        idSesion: name.idSesion
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
      fechaInicioRecurso: data.fechaInicioRecurso,
      fechaFinRecurso: data.fechaFinRecurso,
      estadoRecurso: data.estadoRecurso,
      idSesion: data.idSesion
    });
  }

  public func() {
    this.activeModal.close();
  }

  validaForm(campo: string) {
    return this.formGroup.controls[campo].errors &&
      this.formGroup.controls[campo].touched;
  }
}
