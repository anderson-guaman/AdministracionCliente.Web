import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICliente, INuevoCliente } from '../../dominio/entidades/cliente/cliente.inteface';
import { Observable } from 'rxjs';
import { ApiMicro } from '../../dominio/enum/enum-dominio';
import { environment } from '../../../environments/environment';

// impor

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient,
  ) { }

  async ObtenerClientes(): Promise<Observable<ICliente[]>>{
    return await this.http.get<ICliente[]>(`${environment.baseUrl}/ApiMicro.AdministracionClienteMicro`)
  }

  crearCliente(cliente: INuevoCliente): Observable<ICliente> {
    return this.http.post<ICliente>(`${environment.baseUrl}/ApiMicro.AdministracionClienteMicro`, cliente);
  }

  actualizarCliente(id: string, cliente: Partial<INuevoCliente> & { usuario: string }) {
    return this.http.patch<ICliente>(`${environment.baseUrl}/${ApiMicro.AdministracionClienteMicro}/${id}`, cliente);
  }

  eliminarCliente(id: string): Observable<ICliente> {
    return this.http.delete<ICliente>(`${environment.baseUrl}/${ApiMicro.AdministracionClienteMicro}/${id}`);
  }
  obtenerTiposDocumentos(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseUrl}/${ApiMicro.AdministracionClienteMicro}/tipoDocumento`);
  }
}
