import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IConsumo, IConsumoCrear } from "../../dominio/entidades/consumo/consumo.interface";
import { ApiMicro } from "../../dominio/enum/enum-dominio";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ConsumoService {
  constructor(
    private http: HttpClient,
  ) { }

  crearConsumo(dto: IConsumoCrear): Observable<IConsumo>{
    return this.http.post<IConsumo>(`${ApiMicro.AdministracionConsumo}/registrar`, dto);
  }

  async obtenerConsumos(){
    return await this.http.get<IConsumo[]>(`${ApiMicro.AdministracionConsumo}/obtener`)
  }
}
