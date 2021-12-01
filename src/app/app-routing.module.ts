import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CoreComponent} from "./core/core.component";

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [

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
      {
        path: 'login',
        loadChildren: () => import('./core/core.module')
          .then(m => m.CoreModule)
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
