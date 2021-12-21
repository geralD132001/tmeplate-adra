import { Component, Input,OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AlternativaService} from "../../../../providers/services/alternativa.service";
import {PreguntaService} from "../../../../providers/services/pregunta.service";

@Component({
  selector: 'app-form-alternativas',
  templateUrl: './form-alternativas.component.html',
  styleUrls: ['./form-alternativas.component.css']
})
export class FormAlternativasComponent implements OnInit {

  alternativa: any[] = [];
  preguntas: any[] = [];
  @Input() item: any;
  @Input() id_alternativa: any;
  @Input() title: any;
  idAlternativa: string;
  isUpdating: boolean;
  formGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private alternativaService: AlternativaService,
              private preguntaService: PreguntaService) { }

  ngOnInit(): void {
    this.inicio();
    this.getPreguntas();
    this.isUpdating = false;
    if (this.item) {
      this.updateData();
    } else {
      this.item = [];
      this.id_alternativa = '';
    }
    console.log(this.item);
  }


  getPreguntas(): void {
    this.preguntaService.getAll$().subscribe(response => {
      console.log(response);
      this.preguntas = response.data || [];
    });
  }

  private inicio(): any {
    const controls = {
      nombreAlternativa: ['', [Validators.required]],
      esCorrecta: ['', [Validators.required]],
      idPregunta: [''],
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
      esCorrecta: name.esCorrecta,
      pregunta: {
        idPregunta: name.idPregunta
      }
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
      esCorrecta: name.esCorrecta,
      pregunta: {
        idPregunta: name.idPregunta
      }
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
      nombreAlternativa: data.nombreAlternativa,
      esCorrecta: data.esCorrecta,
      idPregunta: data.idPregunta
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
