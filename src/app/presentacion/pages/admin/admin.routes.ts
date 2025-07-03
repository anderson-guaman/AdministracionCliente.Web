import { Routes } from "@angular/router";
import { AdminComponent } from './admin.component';
import { ClienteComponent } from "./cliente/cliente.component";
import { PlanComponent } from "./plan/plan.component";
import { ConsumoComponent } from "./consumo/consumo.component";
import { ReporteClientesComponent } from "./reportes/reporte-clientes/reporte-clientes.component";
import { AuthGuard } from "../../../infraestructura/service/auth-guard.service";
import { ReporteConsumoPlanesComponent } from "./reportes/reporte-consumo-planes/reporte-consumo-planes.component";


export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: ClienteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'plan',
        component: PlanComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'consumo',
        component: ConsumoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'reportes',
        children: [
          {
            path: '',
            redirectTo: 'clientes',
            pathMatch: 'full'
          },
          {
            path: 'clientes',
            component: ReporteClientesComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'consumos',
            component: ReporteConsumoPlanesComponent,
            canActivate: [AuthGuard],

          }

        ]
      },

    ]
  },
]

export default adminRoutes;
