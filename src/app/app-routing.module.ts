import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageUserComponent} from "./core/main-page-user/main-page-user.component"
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {MainPageComponent} from "./core/main-page/main-page.component";
import {CoreComponent} from "./core/core.component";

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'modulo',
        loadChildren: () => import('./pages/modulo/modulo.module')
          .then(m => m.ModuloModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./pages/pedidos/pedidos.module')
          .then(m => m.PedidosModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/usuarios/usuarios.module')
          .then(m => m.UsuariosModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
