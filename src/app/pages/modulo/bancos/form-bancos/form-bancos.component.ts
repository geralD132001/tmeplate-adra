import { Component, OnInit,Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BancoService} from "../../../../providers/services/banco.service";


@Component({
  selector: 'app-form-bancos',
  templateUrl: './form-bancos.component.html',
  styleUrls: ['./form-bancos.component.css']
})
export class FormBancosComponent implements OnInit {

  banco: any[] = [];
  @Input() item: any;
  @Input() id_banco: any;
  @Input() title: any;
  idBanco: string;
  isUpdating: boolean;
  formGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private bancoService: BancoService) { }

  ngOnInit(): void {
    this.inicio();
    this.isUpdating = false;
    if (this.item) {
      this.updateData();
    } else {
      this.item = [];
      this.id_banco = '';
    }
    console.log(this.item);
  }

  private inicio(): any {
    const controls = {
      nombreBanco: ['', [Validators.required]],
      nombreEncargado: ['', [Validators.required]],
      estadoBanco: [''],
    };
    this.formGroup = this.formBuilder.group(controls);
  }

  save(name: any): void {
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }
    const save: any = {
      nombreBanco: name.nombreBanco,
      nombreEncargado: name.nombreEncargado,
      estadoBanco: name.estadoBanco
    };
    this.bancoService.add$(save).subscribe(response => {
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
      idBanco: this.idBanco,
      nombreBanco: name.nombreBanco,
      nombreEncargado: name.nombreEncargado,
      estadoBanco: name.estadoBanco
    }
    this.bancoService.update$(this.idBanco, save).subscribe(response => {
      if (response.success) {
        this.activeModal.close({ success: true, message: response.message });
      } else {
      }
    }, () => { }, () => {  });
  }

  updateData(): any {
    const data = this.item;
    this.isUpdating = true;
    this.idBanco = data.idBanco;
    this.formGroup.patchValue({
      nombreBanco: data.nombreBanco,
      nombreEncargado: data.nombreEncargado,
      estadoBanco: data.estadoBanco
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
