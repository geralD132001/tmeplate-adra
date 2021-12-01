import { Component,Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PreguntaService} from "../../../../providers/services/pregunta.service";

@Component({
  selector: 'app-form-preguntas',
  templateUrl: './form-preguntas.component.html',
  styleUrls: ['./form-preguntas.component.css']
})
export class FormPreguntasComponent implements OnInit {

  pregunta: any[] = [];
  @Input() item: any;
  @Input() id_pregunta: any;
  @Input() title: any;
  idPregunta: string;
  isUpdating: boolean;
  formGroup: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private preguntaService: PreguntaService) { }

  ngOnInit(): void {
    this.inicio();
    this.isUpdating = false;
    if (this.item) {
      this.updateData();
    } else {
      this.item = [];
      this.id_pregunta = '';
    }
    console.log(this.item);
  }
  private inicio(): any {
    const controls = {
      nombrePregunta: ['', [Validators.required]],
    };
    this.formGroup = this.formBuilder.group(controls);
  }

  save(name: any): void {
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }
    const save: any = {
      nombrePregunta: name.nombrePregunta
    };
    this.preguntaService.add$(save).subscribe(response => {
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
      idPregunta: this.idPregunta,
      nombrePregunta: name.nombrePregunta
    }

    this.preguntaService.update$(this.idPregunta, save).subscribe(response => {
      if (response.success) {
        this.activeModal.close({ success: true, message: response.message });
      } else {
      }
    }, () => { }, () => {  });
  }

  updateData(): any {
    const data = this.item;
    this.isUpdating = true;
    this.idPregunta = data.idPregunta;
    this.formGroup.patchValue({
      nombrePregunta: data.nombrePregunta
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
