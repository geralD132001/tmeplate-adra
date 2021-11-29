import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./main-page/header/header.component";
import {FooterComponent} from "./main-page/footer/footer.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {SidebarComponent} from "./main-page/sidebar/sidebar.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import { MainPageUserComponent } from './main-page-user/main-page-user.component';
import { HeaderunoComponent } from './main-page-user/headeruno/headeruno.component';
import {FooterunoComponent} from './main-page-user/footeruno/footeruno.component'
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import { CoreComponent } from './core.component';
import {DashboardComponent} from "../pages/dashboard/dashboard.component";
import { MainPagePublicComponent } from './main-page-public/main-page-public.component';

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
    MainPageUserComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HeaderunoComponent,
    FooterunoComponent,
    CoreComponent,
    DashboardComponent,
    MainPagePublicComponent
  ],
    imports: [
        ...BASE_MODULES,
        NgbCollapseModule,

    ],
  exports: [
    MainPageComponent,
    DashboardComponent
  ],
  providers: []
})
export class CoreModule {
}
