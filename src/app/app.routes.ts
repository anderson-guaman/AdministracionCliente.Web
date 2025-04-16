import { Routes } from '@angular/router';
import { ClienteComponent } from './presentacion/pages/cliente/cliente.component';
import { AuthGuard } from './infraestructura/service/auth-guard.service';
import { LoginComponent } from './presentacion/pages/login/login.component';

export const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'',
    component: ClienteComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  },
];
