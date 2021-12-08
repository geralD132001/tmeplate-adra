import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RecursosComponent} from "./recursos.component";
import {RecursosRoutingModule} from "./recursos-routing.module";
import {RecursoService} from "../../../providers/services/recurso.service";
import { FormRecursosComponent } from './form-recursos/form-recursos.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    RecursosComponent,
    FormRecursosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecursosRoutingModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule
  ],
  providers: [RecursoService],
})
export class RecursosModule { }
