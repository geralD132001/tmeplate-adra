import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FormAlternativasComponent} from "./form-alternativas/form-alternativas.component";
import {AlternativasComponent} from "./alternativas.component";
import {AlternativasRoutingModule} from "./alternativas-routing.module";
import {AlternativaService} from "../../../providers/services/alternativa.service";


@NgModule({
  declarations: [
    AlternativasComponent,
    FormAlternativasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlternativasRoutingModule
  ],
  providers: [AlternativaService],
})
export class AlternativasModule { }
