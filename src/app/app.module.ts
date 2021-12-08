import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppRoutingModule} from "./app-routing.module";
import {CoreModule} from "./core/core.module";
import {CommonModule} from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {MatIconModule} from '@angular/material/icon'
import {MatGridListModule} from '@angular/material/grid-list'



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
        BrowserAnimationsModule,
        MatProgressBarModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatGridListModule
    ],
    providers: [],
    exports: [
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
