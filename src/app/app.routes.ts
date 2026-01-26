import { Routes } from '@angular/router';
import { TabsPage } from "./pages/tabs/tabs.page";

export const routes: Routes = [
  {
    path: '',
    component: TabsPage, // TabsPage es el componente principal
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.page').then(
            (m) => m.CategoriesPage
          ),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./pages/search/search.page').then((m) => m.SearchPage),
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./pages/details/details.page').then((m) => m.DetailsPage),
      },
      {
        path: '',
        redirectTo: 'home', // Redirige a home por defecto
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
