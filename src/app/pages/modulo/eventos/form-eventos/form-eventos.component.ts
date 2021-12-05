import { Component,Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventoService} from "../../../../providers/services/evento.service";

@Component({
  selector: 'app-form-eventos',
  templateUrl: './form-eventos.component.html',
  styleUrls: ['./form-eventos.component.css']
})
export class FormEventosComponent implements OnInit {

  evento: any;
  @Input() item: any;
  @Input() id_evento: any;
  @Input() title: any;
  idEvento: string;
  isUpdating: boolean;
  formGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private eventoService: EventoService) { }

  ngOnInit(): void {
    this.inicio();
    this.isUpdating = false;
    if (this.item) {
      this.updateData();
    } else {
      this.item = [];
      this.id_evento = '';
    }
    console.log(this.item);
  }
  private inicio(): any {
    const controls = {
      nombreEvento: ['', [Validators.required]],
      descripEvento: ['', [Validators.required]],
      fileUrl: ['', [Validators.required]],
      inicioEvento: [''],
      finEvento: [''],
      estadoEvento: [''],
    };
    this.formGroup = this.formBuilder.group(controls);
  }

  save(name: any): void {
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }

    const save: any = {
      nombreEvento: name.nombreEvento,
      descripEvento: name.descripEvento,
      fileUrl: name.fileUrl,
      inicioEvento: name.inicioEvento,
      finEvento: name.finEvento,
      estadoEvento: name.estadoEvento,
    };

    this.eventoService.add$(save).subscribe(response => {
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
      idEvento: this.idEvento,
      nombreEvento: name.nombreEvento,
      descripEvento: name.descripEvento,
      fileUrl: name.fileUrl,
      inicioEvento: name.inicioEvento,
      finEvento: name.finEvento,
      estadoEvento: name.estadoEvento,
    }

    this.eventoService.update$(this.idEvento, save).subscribe(response => {
      if (response.success) {
        this.activeModal.close({ success: true, message: response.message });
      } else {
      }
    }, () => { }, () => {  });
  }

  updateData(): any {
    const data = this.item;
    this.isUpdating = true;
    this.idEvento = data.idEvento;
    this.formGroup.patchValue({
      nombreEvento: data.nombreEvento,
      descripEvento: data.descripEvento,
      fileUrl: data.fileUrl,
      inicioEvento: data.inicioEvento,
      finEvento: data.finEvento,
      estadoEvento: data.estadoEvento,
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


