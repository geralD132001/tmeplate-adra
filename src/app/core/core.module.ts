import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./main-page/header/header.component";
import {FooterComponent} from "./main-page/footer/footer.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {SidebarComponent} from "./main-page/sidebar/sidebar.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";

const BASE_MODULES = [
  CommonModule,
  RouterModule,
  SharedModule,
  FormsModule,
];

const CORE_COMPONENTS: any[] = [
  MainPageComponent,
  HeaderComponent,
  FooterComponent,
  SidebarComponent
];

@NgModule({
  declarations: [
    ...CORE_COMPONENTS,
  ],
  imports: [
    ...BASE_MODULES
  ],
  exports: [],
  providers: []
})
export class CoreModule {
}
