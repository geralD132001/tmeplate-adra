import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {PersonasComponent} from "./personas.component";
import {PersonasRoutingModule} from "./personas-routing.module";
import {PersonaService} from "../../../providers/services/persona.service";
import { FormPersonasComponent } from './form-personas/form-personas.component';
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    PersonasComponent,
    FormPersonasComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PersonasRoutingModule,
        MatTableModule
    ],
  providers: [PersonaService],
})
export class PersonasModule { }
