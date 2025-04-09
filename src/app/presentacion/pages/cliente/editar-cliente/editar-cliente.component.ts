import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ICliente, INuevoCliente } from '../../../../dominio/entidades/cliente/cliente.inteface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from '../../../../infraestructura/service/api.service';
import { take } from 'rxjs';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-editar-cliente',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './editar-cliente.component.html',
})
export class EditarClienteComponent {
  clienteExistente?: ICliente;
  clienteActualizado?: INuevoCliente;

  clienteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialoConfig: DynamicDialogConfig,
    private clienteService: ApiService,
    private dialogRef: DynamicDialogRef,
  ) {}

  ngOnInit(): void {
    this.clienteExistente = this.dialoConfig.data;

    this.clienteForm = this.fb.group({
      primerNombreCliente: [this.clienteExistente?.primerNombreCliente ?? ''],
      segundoNombreCliente: [this.clienteExistente?.segundoNombreCliente ?? ''],
      primerApellidoCliente: [this.clienteExistente?.primerApellidoCliente ?? ''],
      segundoApellidoCliente: [this.clienteExistente?.segundoApellidoCliente ?? ''],
      tipoIdentificacionCliente: [this.clienteExistente?.tipoIdentificacionCliente ?? ''],
      numeroCedulaCliente: [this.clienteExistente?.numeroCedulaCliente ?? ''],
      direccionCliente: [this.clienteExistente?.direccionCliente ?? ''],
      usuario: ['', Validators.required],
    });
  }

  actualizarCliente() {
    if (this.clienteForm.valid) {
      this.clienteActualizado = this.clienteForm.value;
      this.clienteService.actualizarCliente(this.clienteExistente!.codigoUnicoCliente.toString(),this.clienteActualizado!)
      .pipe(take(1))
      .subscribe({
        next: (resultado =>{
          console.log(resultado)
          this.dialogRef.close()
        }),
        error:(error) => {
          console.error('Error fetching clients:', error);
        }
      })
    }
  }
}
