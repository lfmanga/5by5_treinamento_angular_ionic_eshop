import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MenuPage } from './pages/menu/menu.page';
import { NotfoundPage } from './pages/notfound/notfound.page';


const routes: Routes = [
  /* usuário autenticado */
  {
    path: '',
    canActivate: [AuthGuard],
    component: MenuPage,
    children: [
      { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
      { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule) },
    ]
  },

  /* páginas de autenticação */
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'notfound', loadChildren: './pages/notfound/notfound.module#NotfoundPageModule' },

  {
    path: '**',
    component: NotfoundPage
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
