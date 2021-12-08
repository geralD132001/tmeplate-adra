import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FromCapacitacionComponent} from "./from-capacitacion.component";
import {FromCapacitacionRoutingModule} from "./from-capacitacion-routing.module";
import {AlternativasModule} from "../../modulo/alternativas/alternativas.module";
import {ModuloModule} from "../../modulo/modulo.module";
import {VideoModule} from "../../modulo/video/video.module";


@NgModule({
    declarations: [
        FromCapacitacionComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FromCapacitacionRoutingModule,
        AlternativasModule,
        ModuloModule,
        VideoModule
    ],
    providers: [],
    exports: [
        FromCapacitacionComponent
    ]
})
export class FromCapacitacionModule { }
