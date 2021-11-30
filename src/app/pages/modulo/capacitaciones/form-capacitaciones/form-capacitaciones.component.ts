import { Component,Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CapacitacionService} from "../../../../providers/services/capacitacion.service";

@Component({
  selector: 'app-form-capacitaciones',
  templateUrl: './form-capacitaciones.component.html',
  styleUrls: ['./form-capacitaciones.component.css']
})
export class FormCapacitacionesComponent implements OnInit {

  capacitacion: any[] = [];
  @Input() item: any;
  @Input() id_capacitacion: any;
  @Input() title: any;
  idCapacitacion: string;
  isUpdating: boolean;
  formGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private capacitacionService: CapacitacionService) { }

  ngOnInit(): void {
    this.inicio();
    this.isUpdating = false;
    if (this.item) {
      this.updateData();
    } else {
      this.item = [];
      this.id_capacitacion = '';
    }
    console.log(this.item);
  }
  private inicio(): any {
    const controls = {
      nombreCapacitacion: ['', [Validators.required]],
      descripcionCapacitacion: ['', [Validators.required]],
      tipoCapacitacion: [''],
      estadoCapacitacion: [''],
    };
    this.formGroup = this.formBuilder.group(controls);
  }

  save(name: any): void {
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }
    const save: any = {
      nombreCapacitacion: name.nombreCapacitacion,
      descripcionCapacitacion: name.descripcionCapacitacion,
      tipoCapacitacion: name.tipoCapacitacion,
      estadoCapacitacion: name.estadoCapacitacion
    };
    this.capacitacionService.add$(save).subscribe(response => {
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
    // this.formGroup.reset();
    const save: any = {
      idCapacitacion: this.idCapacitacion,
      nombreCapacitacion: name.nombreCapacitacion,
      descripcionCapacitacion: name.descripcionCapacitacion,
      tipoCapacitacion: name.tipoCapacitacion,
      estadoCapacitacion: name.estadoCapacitacion
    }
    this.capacitacionService.update$(this.idCapacitacion, save).subscribe(response => {
      if (response.success) {
        this.activeModal.close({ success: true, message: response.message });
      } else {
      }
    }, () => { }, () => {  });
  }

  updateData(): any {
    const data = this.item;
    this.isUpdating = true;
    this.idCapacitacion = data.idCapacitacion;
    this.formGroup.patchValue({
      nombreCapacitacion: data.nombreCapacitacion,
      descripcionCapacitacion: data.descripcionCapacitacion,
      tipoCapacitacion: data.tipoCapacitacion,
      estadoCapacitacion: data.estadoCapacitacion
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
