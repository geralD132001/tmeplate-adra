import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {TiporecursosComponent} from "./tiporecursos.component";
import {TiposrecursosRoutingModule} from "./tiposrecursos-routing.module";
import {TiporecursoService} from "../../../providers/services/tiporecurso.service";



@NgModule({
  declarations: [
    TiporecursosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TiposrecursosRoutingModule
  ],
  providers: [TiporecursoService],
})
export class TiposrecursosModule { }
