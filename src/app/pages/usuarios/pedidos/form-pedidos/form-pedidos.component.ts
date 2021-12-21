import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PedidoService} from "../../../../providers/services/pedido.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-pedidos',
  templateUrl: './form-pedidos.component.html',
  styleUrls: ['./form-pedidos.component.css']
})
export class FormPedidosComponent implements OnInit {


  @Input() item: any;
  @Input() id_pedido: any;
  @Input() title: any;
  idPedido: string;
  isUpdating: boolean;
  formGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.inicio();
    this.isUpdating = false;
    if (this.item) {
      this.updateData();
    } else {
      this.item = [];
      this.id_pedido = '';
    }
    console.log(this.item);
  }

  private inicio(): any {
    const controls = {
      descripcionOracion: ['', [Validators.required]],
      estadoOracion :[''],
    };
    this.formGroup = this.formBuilder.group(controls);
  }

  save(name: any): void {
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }

    const save: any = {
      descripcionOracion: name.descripcionOracion,
      estadoOracion : name.estadoOracion
    };

    this.pedidoService.add$(save).subscribe(response => {
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
      idPedido: this.idPedido,
      descripcionOracion: name.descripcionOracion,
      estadoOracion : name.estadoOracion
    }

    this.pedidoService.update$(this.idPedido, save).subscribe(response => {
      if (response.success) {
        this.activeModal.close({ success: true, message: response.message });
      } else {
      }
    }, () => { }, () => {  });
  }

  updateData(): any {
    const data = this.item;
    this.isUpdating = true;
    this.idPedido = data.idPedido;
    this.formGroup.patchValue({
      descripcionOracion: data.descripcionOracion,
      estadoOracion : data.estadoOracion
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
