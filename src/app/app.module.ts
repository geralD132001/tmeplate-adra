import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppRoutingModule} from "./app-routing.module";
import {CoreModule} from "./core/core.module";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        AppRoutingModule,
        HttpClientModule,
        CoreModule,
    ],
    providers: [],
    exports: [
        AppComponent,
    ],
    // Los servicios se ponen en providers
    bootstrap: [AppComponent]
})
export class AppModule { }
