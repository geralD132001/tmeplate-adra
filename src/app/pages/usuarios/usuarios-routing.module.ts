import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsuariosComponent} from "./usuarios.component";
import {MainPageComponent} from "../../core/main-page/main-page.component"


const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('src/app/pages/usuarios/login/login.module')
          .then(m => m.LoginModule),
      },
      {
        path: 'home',
        loadChildren: () => import('src/app/pages/usuarios/home/home.module')
          .then(m => m.HomeModule),
      },
      {
        path: 'training',
        loadChildren: () => import('src/app/pages/usuarios/from-capacitacion/from-capacitacion.module')
          .then(m => m.FromCapacitacionModule),
      },
      {
        path: 'event',
        loadChildren: () => import('src/app/pages/usuarios/from-evento/from-evento.module')
          .then(m => m.FromEventoModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule {
}
