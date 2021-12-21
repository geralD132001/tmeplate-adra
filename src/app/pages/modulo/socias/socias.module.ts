import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FormSociasComponent} from "./form-socias/form-socias.component";
import {SociasComponent} from "./socias.component";
import {SociasRoutingModule} from "./socias-routing.module";
import {SociaService} from "../../../providers/services/socia.service";

@NgModule({
  declarations: [
    SociasComponent,
    FormSociasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SociasRoutingModule
  ],
  providers: [SociaService],
})
export class SociasModule{ }
