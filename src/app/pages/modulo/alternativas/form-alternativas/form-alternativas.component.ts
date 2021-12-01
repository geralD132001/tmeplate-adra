import { Component, Input,OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AlternativaService} from "../../../../providers/services/alternativa.service";

@Component({
  selector: 'app-form-alternativas',
  templateUrl: './form-alternativas.component.html',
  styleUrls: ['./form-alternativas.component.css']
})
export class FormAlternativasComponent implements OnInit {

  alternativa: any[] = [];
  @Input() item: any;
  @Input() id_alternativa: any;
  @Input() title: any;
  idAlternativa: string;
  isUpdating: boolean;
  formGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private alternativaService: AlternativaService) { }

  ngOnInit(): void {
    this.inicio();
    this.isUpdating = false;
    if (this.item) {
      this.updateData();
    } else {
      this.item = [];
      this.id_alternativa = '';
    }
    console.log(this.item);
  }

  private inicio(): any {
    const controls = {
      nombreAlternativa: ['', [Validators.required]],
      esCorrecta: ['', [Validators.required]],
    };
    this.formGroup = this.formBuilder.group(controls);
  }

  save(name: any): void {
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }

    const save: any = {
      nombreAlternativa: name.nombreAlternativa,
      esCorrecta: name.esCorrecta
    };

    this.alternativaService.add$(save).subscribe(response => {
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
      idAlternativa: this.idAlternativa,
      nombreAlternativa: name.nombreAlternativa,
      esCorrecta: name.esCorrecta
    }
    this.alternativaService.update$(this.idAlternativa, save).subscribe(response => {
      if (response.success) {
        this.activeModal.close({ success: true, message: response.message });
      } else {
      }
    }, () => { }, () => {  });
  }

  updateData(): any {
    const data = this.item;
    this.isUpdating = true;
    this.idAlternativa = data.idAlternativa;
    this.formGroup.patchValue({
      espeNombre: data.espeNombre,
      nombreAlternativa: data.nombreAlternativa,
      esCorrecta: data.esCorrecta
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
