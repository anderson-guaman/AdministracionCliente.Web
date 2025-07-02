import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { take } from 'rxjs';
import { ICliente } from '../../../../../dominio/entidades/cliente/cliente.inteface';
import { ClienteService } from '../../../../../infraestructura/service/cliente.service';

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
export class NuevoConsumoComponent implements OnInit{
  consumoForm!: FormGroup;
  listaCliente!: ICliente[];


  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
  ){}

  ngOnInit(): void {
    this.construirFormulario();
    this.obtenerClientes();
  }
  guardar(){

  }
  construirFormulario(){
    this.consumoForm = this.fb.group({
      hora: ['', Validators.required],
      consumo: ['',Validators.required],
      fecha: ['', Validators.required],
      cliente: ['',Validators.required],

    });
  }

  async obtenerClientes(){
    (await this.clienteService
          .ObtenerClientes())
        .pipe(take(1))
        .subscribe({
          next: (resultado =>{
            this.listaCliente = resultado.map(c=>{
              return{
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
}
