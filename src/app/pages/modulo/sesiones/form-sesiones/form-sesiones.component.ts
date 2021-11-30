import { Component,Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SesionService} from "../../../../providers/services/sesion.service";

@Component({
  selector: 'app-form-sesiones',
  templateUrl: './form-sesiones.component.html',
  styleUrls: ['./form-sesiones.component.css']
})
export class FormSesionesComponent implements OnInit {

  sesion: any;
  @Input() item: any;
  @Input() id_sesion: any;
  @Input() title: any;
  idSesion: string;
  isUpdating: boolean;
  formGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private sesionService: SesionService) { }

  ngOnInit(): void {
    this.inicio();
    this.isUpdating = false;
    if (this.item) {
      this.updateData();
    } else {
      this.item = [];
      this.id_sesion = '';
    }
    console.log(this.item);
  }
  private inicio(): any {
    const controls = {
      descripcionTema: ['', [Validators.required]],
      descripcionSecion: ['', [Validators.required]],
      fechaInicio: [''],
      fechaFin: [''],
    };
    this.formGroup = this.formBuilder.group(controls);
  }

  save(name: any): void {
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }

    const save: any = {
      descripcionTema: name.descripcionTema,
      descripcionSecion: name.descripcionSecion,
      fechaInicio: name.fechaInicio,
      fechaFin: name.fechaFin
    };

    this.sesionService.add$(save).subscribe(response => {
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
      idSesion: this.idSesion,
      descripcionTema: name.descripcionTema,
      descripcionSecion: name.descripcionSecion,
      fechaInicio: name.fechaInicio,
      fechaFin: name.fechaFin
    }

    this.sesionService.update$(this.idSesion, save).subscribe(response => {
      if (response.success) {
        this.activeModal.close({ success: true, message: response.message });
      } else {
      }
    }, () => { }, () => {  });
  }

  updateData(): any {
    const data = this.item;
    this.isUpdating = true;
    this.idSesion = data.idSesion;
    this.formGroup.patchValue({
      descripcionTema: data.descripcionTema,
      descripcionSecion: data.descripcionSecion,
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin
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
