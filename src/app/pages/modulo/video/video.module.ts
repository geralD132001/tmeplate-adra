import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {VideoComponent} from "./video.component";
import {VideoRoutingModule} from "./video-routing.module";
import {FromCapacitacionModule} from "../../usuarios/from-capacitacion/from-capacitacion.module";


@NgModule({
  declarations: [
    VideoComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VideoRoutingModule,
  ],
  providers: [],
  exports: [
    VideoComponent
  ]
})
export class VideoModule { }
