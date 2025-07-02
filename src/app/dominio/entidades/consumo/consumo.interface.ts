
import { ICliente } from "../cliente/cliente.inteface";

export interface IConsumo {
  idConsumo: number;
  fecha: string;
  hora: string;
  mbConsumidos: number;
  cliente: ICliente;
}
export interface IConsumoPlanes{
  idPlan: number;
  nombre:string;
  consumo_mensual:number;
}

export interface IConsumoClientes{
    codigoUnicoCliente: number;
    primerNombreCliente: string;
    segundoNombreCliente: string;
    idPlan: number;
    plan_actual: string;
    velocidadMbps: number;
    promedio_mensual: number;
    recomendacion: string;
    nombreCompleto?:string;
}
export interface IConsultaConsumoCliente{
  fechaInicio: Date;
  fechaFin: Date;
}
