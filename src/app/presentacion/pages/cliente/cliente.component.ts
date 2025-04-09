import { Component, OnInit } from '@angular/core';
import { ICliente } from '../../../dominio/entidades/cliente/cliente.inteface';
import { TableModule } from 'primeng/table';
import { ApiService } from '../../../infraestructura/service/api.service';
import { take } from 'rxjs';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cliente',
  imports: [TableModule, ButtonModule],
  templateUrl: './cliente.component.html',
})
export class ClienteComponent implements OnInit{
  clientes: ICliente[]=[];
  constructor(
    private clienteServicio: ApiService,
  ){};


  ngOnInit(): void {
    this.obtenerClientes();
  }

  async obtenerClientes(){
    (await this.clienteServicio
      .ObtenerClientes())
    .pipe(take(1))
    .subscribe({
      next: (resultado =>{
        this.clientes = resultado
      }),
      error: (error) => {
        console.error('Error fetching clients:', error);
      }
    });
  }

  abrirNuevoCliente(){

  }

}
