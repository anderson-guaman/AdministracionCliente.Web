import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiMicro } from '../../dominio/enum/enum-dominio';
import { IConsultaConsumoCliente, IConsumoClientes, IConsumoPlanes } from '../../dominio/entidades/consumo/consumo.interface';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  constructor(
    private http: HttpClient,
  ) { }

  async obtenerPlanes(){
    return await this.http.get<IConsumoPlanes[]>(`${ApiMicro.AdministracionCoreMicro}/obtenerConsumoPlanes`)
  }
  obtenerConsumoClientes(filtros: IConsultaConsumoCliente): Observable<IConsumoClientes[]> {
      return this.http.post<IConsumoClientes[]>(`${ApiMicro.AdministracionCoreMicro}/ObtenerReporteConsumoClientes`, filtros);
  }
}
