import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICliente } from '../../dominio/entidades/cliente/cliente.inteface';
import { Observable } from 'rxjs';
import { ApiMicro } from '../../dominio/enum/enum-dominio';
import { IPlan } from '../../dominio/entidades/plan/plan.interface';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(
    private http: HttpClient,

  ) { }

  crearPlan(plan: IPlan): Observable<ICliente> {
    return this.http.post<ICliente>(`${ApiMicro.AdministracionPlanMicro}/CrearPlan`, plan);
  }

  async obtenerPlanes(){
    return await this.http.get<IPlan[]>(`${ApiMicro.AdministracionPlanMicro}/ObtenerPlanes`)
  }
}
