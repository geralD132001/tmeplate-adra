import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModuloRoutingModule} from "./modulo-routing.module";
import {ModuloComponent} from "./modulo.component";


@NgModule({
    declarations: [ModuloComponent],

    imports: [
        CommonModule,
        ModuloRoutingModule,
    ]
})
export class ModuloModule { }
