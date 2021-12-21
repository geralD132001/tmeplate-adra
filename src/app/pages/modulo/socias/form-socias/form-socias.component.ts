import { Component,Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SociaService} from "../../../../providers/services/socia.service";
import {PersonaService} from "../../../../providers/services/persona.service";
import {BancoService} from "../../../../providers/services/banco.service"


@Component({
  selector: 'app-form-socias',
  templateUrl: './form-socias.component.html',
  styleUrls: ['./form-socias.component.css']
})
export class FormSociasComponent implements OnInit {


  socia: any [] = [];
  personas: any ;
  bancos: any  ;
  @Input() item: any;
  @Input() id_socia: any;
  @Input() title: any;
  idSocia: string;
  isUpdating: boolean;
  formGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private personaService: PersonaService,
              private bancoService: BancoService,
              private sociaService : SociaService) { }

  ngOnInit(): void {
    this.getBancos();
    this.getPersonas();
    this.inicio();
    this.isUpdating = false;
    if (this.item) {
      this.updateData();
    } else {
      this.item = [];
      this.id_socia = '';
    }
    console.log(this.item);
  }
  getBancos(): void {
    this.bancoService.getAll$().subscribe(response => {
      this.bancos = response.data || [];
    });
  }
  getPersonas(): void {
    this.personaService.getAll$().subscribe(response => {
      this.personas = response.data || [];
    });
  }
  private inicio(): any {
    const controls = {
      estadoSocia: ['', [Validators.required]],
      idPersona: [''],
      idBanco: [''],
    };
    this.formGroup = this.formBuilder.group(controls);
  }

  save(name: any): void {
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }
    const save: any = {
      estadoSocia: name.estadoSocia,
      persona: {
        idPersona: name.idPersona
      },
      bancoComunal: {
        idBanco: name.idBanco
      }
    };
    this.sociaService.add$(save).subscribe(response => {
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
      idSocia: this.idSocia,
      estadoSocia: name.estadoSocia,
      persona: {
        idPersona: name.idPersona
      },
      bancoComunal: {
        idBanco: name.idBanco
      }
    }
    this.sociaService.update$(this.idSocia, save).subscribe(response => {
      if (response.success) {
        this.activeModal.close({ success: true, message: response.message });
      } else {
      }
    }, () => { }, () => {  });
  }

  updateData(): any {
    const data = this.item;
    this.isUpdating = true;
    this.idSocia = data.idSocia;
    this.formGroup.patchValue({
      estadoSocia: data.estadoSocia,
      idPersona: data.idPersona,
      idBanco: data.idBanco
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
