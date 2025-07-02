import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICliente } from '../../dominio/entidades/cliente/cliente.inteface';
import { Observable } from 'rxjs';
import { ApiMicro } from '../../dominio/enum/enum-dominio';
import { IPlan } from '../../dominio/entidades/plan/plan.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(
    private http: HttpClient,

  ) { }

  crearPlan(plan: IPlan): Observable<ICliente> {
    return this.http.post<ICliente>(`${environment.baseUrl}/${ApiMicro.AdministracionPlanMicro}/CrearPlan`, plan);
  }

  async obtenerPlanes(){
    return await this.http.get<IPlan[]>(`${environment.baseUrl}/${ApiMicro.AdministracionPlanMicro}/ObtenerPlanes`)
  }
}
