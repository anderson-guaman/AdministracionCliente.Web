import { Routes } from '@angular/router';
import { LoginComponent } from './presentacion/pages/login/login.component';
import { ConsumoComponent } from './presentacion/pages/admin/consumo/consumo.component';

export const routes: Routes = [

  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'admin',
    loadChildren:()=>import('./presentacion/pages/admin/admin.routes')
  },
  {
    path:'consumo',
    component:ConsumoComponent,
    canActivate:[]
  },
  {
    path: '**',
    redirectTo: 'admin'
  },
];
