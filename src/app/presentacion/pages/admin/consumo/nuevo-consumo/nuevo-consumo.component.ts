import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { take } from 'rxjs';
import { ICliente } from '../../../../../dominio/entidades/cliente/cliente.inteface';
import { ClienteService } from '../../../../../infraestructura/service/cliente.service';
import { IConsumo, IConsumoCrear } from '../../../../../dominio/entidades/consumo/consumo.interface';
import { ConsumoService } from '../../../../../infraestructura/service/cosumo.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-nuevo-consumo',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    DropdownModule
  ],
  templateUrl: './nuevo-consumo.component.html',
})
export class NuevoConsumoComponent implements OnInit {
  consumoForm!: FormGroup;
  listaCliente!: ICliente[];


  constructor(
    private clienteService: ClienteService,
    private consumoService: ConsumoService,
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
    this.obtenerClientes();
  }

  construirFormulario() {
    this.consumoForm = this.fb.group({
      hora: ['', Validators.required],
      consumo: ['', Validators.required],
      fecha: ['', Validators.required],
      cliente: ['', Validators.required],

    });
  }

  async obtenerClientes() {
    (await this.clienteService
      .ObtenerClientes())
      .pipe(take(1))
      .subscribe({
        next: (resultado => {
          this.listaCliente = resultado.map(c => {
            return {
              ...c,
              nombreCompleto: `${c.primerNombreCliente} ${c.primerApellidoCliente}`
            }
          })
        }),
        error: (error) => {
          console.error('Error fetching clients:', error);
        }
      });
  }

  guardarConsumo() {
    if (this.consumoForm.valid) {
      const datos = this.consumoForm.getRawValue();
      const dto: IConsumoCrear = {
        idConsumo: 0,
        fecha: datos.fecha,
        hora: datos.hora,
        mbConsumidos: datos.consumo,
        clienteCodigoUnicoCliente: datos.cliente.codigoUnicoCliente,
      }

      this.consumoService.crearConsumo(dto)
        .pipe(take(1))
        .subscribe({
          next: (resultado) => {
            console.log('Cliente emitido:', resultado);
            this.dialogRef.close()
          },
          error: (error) => {
            console.error('Error created clients:', error);
            alert(error.error.message)
          }
        })
    }
  }
}
