import { Component,  Input,OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PersonaService} from "../../../../providers/services/persona.service";


@Component({
  selector: 'app-form-personas',
  templateUrl: './form-personas.component.html',
  styleUrls: ['./form-personas.component.css']
})
export class FormPersonasComponent implements OnInit {

  persona: any[] = [];
  @Input() item: any;
  @Input() id_persona: any;
  @Input() title: any;
  idPersona: string;
  isUpdating: boolean;
  formGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private personaService: PersonaService) { }

  ngOnInit(): void {
    this.inicio();
    this.isUpdating = false;
    if (this.item) {
      this.updateData();
    } else {
      this.item = [];
      this.id_persona = '';
    }
    console.log(this.item);
  }
  private inicio(): any {
    const controls = {
      nombrePersona: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: [''],
      diDireccion: [''],
      numeroCelular:[''],
      cod_identidad:[''],
      tiNacionalidad:[''],
    };
    this.formGroup = this.formBuilder.group(controls);
  }

  save(name: any): void {
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }
    // this.formGroup.reset();
    const save: any = {
      nombrePersona: name.nombrePersona,
      apellidoPaterno: name.apellidoPaterno,
      apellidoMaterno: name.apellidoMaterno,
      diDireccion: name.diDireccion,
      numeroCelular: name.numeroCelular,
      cod_identidad: name.cod_identidad,
      tiNacionalidad: name.tiNacionalidad
    };
    this.personaService.add$(save).subscribe(response => {
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
      idPersona: this.idPersona,
      nombrePersona: name.nombrePersona,
      apellidoPaterno: name.apellidoPaterno,
      apellidoMaterno: name.apellidoMaterno,
      diDireccion: name.diDireccion,
      numeroCelular:name.numeroCelular,
      cod_identidad: name.cod_identidad,
      tiNacionalidad: name.tiNacionalidad,
      estado: true,
    }
    this.personaService.update$(this.idPersona, save).subscribe(response => {
      if (response.success) {
        this.activeModal.close({ success: true, message: response.message });
      } else {
      }
    }, () => { }, () => {  });
  }

  updateData(): any {
    const data = this.item;
    this.isUpdating = true;
    this.idPersona = data.idPersona;
    this.formGroup.patchValue({
      nombrePersona: data.nombrePersona,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      diDireccion: data.diDireccion,
      numeroCelular: data.numeroCelular,
      cod_identidad: data.cod_identidad,
      tiNacionalidad: data.tiNacionalidad
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
