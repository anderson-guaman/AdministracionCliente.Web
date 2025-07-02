import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { NuevoConsumoComponent } from './nuevo-consumo/nuevo-consumo.component';
import { IConsumo } from '../../../../dominio/entidades/consumo/consumo.interface';
import { AuthService } from '../../../../infraestructura/service/auth.service';

@Component({
  selector: 'app-consumo',
  imports: [ButtonModule, TableModule, ToastModule],
  templateUrl: './consumo.component.html',
  providers:[DynamicDialogRef],
})
export class ConsumoComponent implements OnInit{

  consumos: IConsumo[] = [];
  rol: string = '' ;

  constructor(
    private dynamicDialogRef: DynamicDialogRef,
    private dialogService: DialogService,
    private messageService: MessageService,
    private authService: AuthService,
  ){};

  ngOnInit(): void {
    this.obtenerRol()
  }
  abrirDialogEditar(consumo: IConsumo) { }
  eliminarCliente(consumo: IConsumo) { }

  abrirNuevoPlan() {
    this.dynamicDialogRef = this.dialogService
      .open(NuevoConsumoComponent,
        {
          header: 'Nuevo Plan',
          width: '50vw',
          modal: true,
          contentStyle: { overflow: 'auto' },
          breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
          },
        }
      );

    this.dynamicDialogRef.onClose.subscribe(() => {
      // this.messageService.add({
      //   severity: 'info',
      //   summary: 'Cliente guardado exitosamente',
      //   detail: ''
      // });
      this.ngOnInit();
    });
  }

  obtenerConsumos(){

  }

  obtenerRol(){
    const usuarioString = localStorage.getItem('user');
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;
    if(usuario) {
      this.rol = usuario[0].usuario
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
