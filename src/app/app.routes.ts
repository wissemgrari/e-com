import { Routes } from '@angular/router';
import { Home } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home',
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then((c) => c.Cart),
    title: 'Cart',
  },
];
