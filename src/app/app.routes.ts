import { Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () =>
      import('../modules/home/home.module').then((m) => m.HomeModule),
  },
];
