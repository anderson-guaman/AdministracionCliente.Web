import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICliente } from '../../dominio/entidades/cliente/cliente.inteface';
import { Observable } from 'rxjs';
import { ApiMicro } from '../../dominio/enum/enum-dominio';

// impor

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  async ObtenerClientes(): Promise<Observable<ICliente[]>>{
    return await this.http.get<ICliente[]>(ApiMicro.AdministracionClienteMicro)
  }
}
