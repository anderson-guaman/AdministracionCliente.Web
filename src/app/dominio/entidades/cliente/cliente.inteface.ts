export interface ICliente {
  codigoUnicoCliente: number;
  primerNombreCliente: string;
  segundoNombreCliente: string;
  primerApellidoCliente: string;
  segundoApellidoCliente: string;
  tipoIdentificacionCliente: string;
  numeroCedulaCliente: string;
  direccionCliente: string;
  telefonoCliente: string[];
  usuarioCreacion: string;
  usuarioEliminacion?: string | null;
  usuarioModificacion?: string | null;
  fechaCreacion: string;
  fechaEliminacion?: string | null;
  fechaModificacion?: string | null;
}

export interface INuevoCliente {
  primerNombreCliente: string;
  segundoNombreCliente: string;
  primerApellidoCliente: string;
  segundoApellidoCliente: string;
  tipoIdentificacionCliente: string;
  numeroCedulaCliente: string;
  direccionCliente: string;
  telefonoCliente: string[];
  usuario: string;
}
