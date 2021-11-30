import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {LoginRoutingModule} from "./login-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../providers/services/auth.service";



@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoginRoutingModule
    ],
    exports: [
        LoginComponent
    ],
    providers: [AuthService]
})
export class LoginModule { }
