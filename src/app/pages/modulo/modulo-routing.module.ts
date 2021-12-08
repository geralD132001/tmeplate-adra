import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ModuloComponent} from "./modulo.component";


const routes: Routes = [
  {
    path: '',
    component: ModuloComponent,
    children: [

      {
        path: 'banks',
        loadChildren: () => import('src/app/pages/modulo/bancos/bancos.module')
          .then(m => m.BancosModule),
      },
      {
        path: 'trainings',
        loadChildren: () => import('src/app/pages/modulo/capacitaciones/capacitaciones.module')
          .then(m => m.CapacitacionesModule),
      },
      {
        path: 'events',
        loadChildren: () => import('src/app/pages/modulo/eventos/eventos.module')
          .then(m => m.EventosModule),
      },
      {
        path: 'informs',
        loadChildren: () => import('src/app/pages/modulo/informes/informes.module')
          .then(m => m.InformesModule),
      },
      {
        path: 'reports',
        loadChildren: () => import('src/app/pages/modulo/reportes/reportes.module')
          .then(m => m.ReportesModule),
      },
      {
        path: 'sessions',
        loadChildren: () => import('src/app/pages/modulo/sesiones/sesiones.module')
          .then(m => m.SesionesModule),
      },
      {
        path: 'persons',
        loadChildren: () => import('src/app/pages/modulo/personas/personas.module')
          .then(m => m.PersonasModule),
      },
      {
        path: 'suggestions',
        loadChildren: () => import('src/app/pages/modulo/sugerencias/sugerencias.module')
          .then(m => m.SugerenciasModule),
      },
      {
        path: 'resources',
        loadChildren: () => import('src/app/pages/modulo/recursos/recursos.module')
          .then(m => m.RecursosModule),
      },
      {
        path: 'alternatives',
        loadChildren: () => import('src/app/pages/modulo/alternativas/alternativas.module')
          .then(m => m.AlternativasModule),
      },
      {
        path: 'questions',
        loadChildren: () => import('src/app/pages/modulo/preguntas/preguntas.module')
          .then(m => m.PreguntasModule),
      },
      {
        path: 'videos',
        loadChildren: () => import('src/app/pages/modulo/video/video.module')
          .then(m => m.VideoModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloRoutingModule {
}
