import { Component,Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {RecursoService} from "../../../../providers/services/recurso.service";

@Component({
  selector: 'app-form-recursos',
  templateUrl: './form-recursos.component.html',
  styleUrls: ['./form-recursos.component.css']
})
export class FormRecursosComponent implements OnInit {

  recurso: any[] = [];
  @Input() item: any;
  @Input() id_recurso: any;
  @Input() title: any;
  idRecurso: string;
  isUpdating: boolean;
  formGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private recursoService: RecursoService) { }

  ngOnInit(): void {
    this.inicio();
    this.isUpdating = false;
    if (this.item) {
      this.updateData();
    } else {
      this.item = [];
      this.id_recurso = '';
    }
    console.log(this.item);
  }
  private inicio(): any {
    const controls = {
      nombreRecurso: ['', [Validators.required]],
      url: ['', [Validators.required]],
      fechaInicioRecurso: [''],
      fechaFinRecurso: [''],
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
      fechaFinRecurso: name.fechaFinRecurso
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
      fechaFinRecurso: name.fechaFinRecurso
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
      fechaFinRecurso: data.fechaFinRecurso
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
