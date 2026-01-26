import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./pages/inicio/inicio.page').then((m) => m.InicioPage),
  },
  {
    path: 'buscar',
    loadComponent: () =>
      import('./pages/buscar/buscar.page').then((m) => m.BuscarPage),
  },
  {
    path: 'seccion/:section',
    loadComponent: () =>
      import('./pages/seccion/seccion.page').then((m) => m.SeccionPage),
  },
  {
    path: 'noticia/:id',
    loadComponent: () =>
      import('./pages/detalle/detalle.page').then((m) => m.DetallePage),
  },
];
