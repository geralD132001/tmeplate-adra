import { Component,Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SesionService} from "../../../../providers/services/sesion.service";
import {CapacitacionService} from "../../../../providers/services/capacitacion.service";

@Component({
  selector: 'app-form-sesiones',
  templateUrl: './form-sesiones.component.html',
  styleUrls: ['./form-sesiones.component.css']
})
export class FormSesionesComponent implements OnInit {

  sesion: any[] = [];
  capacitaciones : any[] = [];
  @Input() item: any;
  @Input() id_sesion: any;
  @Input() title: any;
  idSesion: string;
  isUpdating: boolean;
  formGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private sesionService: SesionService,
              private capacitacionService: CapacitacionService) { }

  ngOnInit(): void {
    this.getCacapacitaciones();
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

  getCacapacitaciones(): void {
    this.capacitacionService.getAll$().subscribe(response => {
      this.capacitaciones = response.data || [];
    });
  }

  private inicio(): any {
    const controls = {
      descripcionTema: ['', [Validators.required]],
      descripcionSecion: ['', [Validators.required]],
      fechaInicio: [''],
      fechaFin: [''],
      idCapacitacion:[''],
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
      fechaFin: name.fechaFin,
      capacitacion: {
        idCapacitacion: name.idCapacitacion
      }
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
      fechaFin: name.fechaFin,
      capacitacion: {
        idCapacitacion: name.idCapacitacion
      }
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
      fechaFin: data.fechaFin,
      idCapacitacion: data.idCapacitacion
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
