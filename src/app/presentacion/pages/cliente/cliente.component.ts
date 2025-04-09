import { Component, OnInit } from '@angular/core';
import { ICliente } from '../../../dominio/entidades/cliente/cliente.inteface';
import { TableModule } from 'primeng/table';
import { ApiService } from '../../../infraestructura/service/api.service';
import { take } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog'
import { NuevoClienteComponent } from './nuevo-cliente/nuevo-cliente.component';
import { MessageService } from 'primeng/api';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';

@Component({
  selector: 'app-cliente',
  imports: [TableModule, ButtonModule,DynamicDialogModule],
  templateUrl: './cliente.component.html',
})
export class ClienteComponent implements OnInit{

  clientes: ICliente[]=[];
  ref : DynamicDialogRef | undefined;
  constructor(
    private clienteServicio: ApiService,
    private dialogService: DialogService,
    private messageService: MessageService,
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
    this.ref = this.dialogService.open(NuevoClienteComponent,{
      header: 'Nuevo Cliente',
      width: '50vw',
      modal: true,
      contentStyle: { overflow: 'auto' },
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
    });

    this.ref.onClose.subscribe(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Cliente guardado exitosamente',
        detail: ''
      });
    });
  }
  abrirDialogEditar(cliente: ICliente){
    this.ref = this.dialogService.open(EditarClienteComponent,{
      header: 'Editar Cliente',
      width: '50vw',
      modal: true,
      contentStyle: { overflow: 'auto' },
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
      data : cliente
    });

    this.ref.onClose.subscribe(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Cliente editado exitosamente',
        detail: ''
      });
    });
  }

}
