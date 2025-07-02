import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { take } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { IConsultaConsumoCliente, IConsumoClientes } from '../../../../../dominio/entidades/consumo/consumo.interface';
import { CoreService } from '../../../../../infraestructura/service/core-service.service';

@Component({
  selector: 'app-reporte-clientes',
  imports: [
    ButtonModule,
    TableModule,
    ToastModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    DropdownModule
  ],
  templateUrl: './reporte-clientes.component.html',
})
export class ReporteClientesComponent implements OnInit{
  consultaForm!:FormGroup;
  reporteConsumoCliente!: IConsumoClientes[];
  user = JSON.parse(localStorage.getItem('user') || '{}');
  rol = this.user.usuario ? this.user.roles : '';

  constructor(
    private coreService: CoreService,
    private fb: FormBuilder,
  ){

  }

  ngOnInit(): void {
    this.construirFormulario();
    // this.obtenerConsumoClientes();
  }

  construirFormulario(){
    this.consultaForm = this.fb.group({
      fechaIni: [null, Validators.required],
      fechaFin: [null,Validators.required],
      // topeMensualPlan: ['', Validators.required],
    })
  }

  async obtenerConsumoClientes(){
    const dto:IConsultaConsumoCliente = {
      fechaInicio: this.consultaForm.controls['fechaIni'].value,
      fechaFin: this.consultaForm.controls['fechaFin'].value
    };

    this.coreService.obtenerConsumoClientes(dto)
        .pipe(take(1))
        .subscribe({
          next: (resultado => {
            this.reporteConsumoCliente = resultado.map( r =>{
              return{
                ...r,
                nombreCompleto: `${r.primerNombreCliente} ${r.segundoNombreCliente}`
              }
            })
          }),
          error: (error) => {
            console.error('Error created clients:', error);
            alert(error.error.message)
          }
        })
    }

    consultar(){
      this.obtenerConsumoClientes();
    }
}
