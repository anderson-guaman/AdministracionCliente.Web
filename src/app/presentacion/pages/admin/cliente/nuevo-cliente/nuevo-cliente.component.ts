
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { take } from 'rxjs';
import { IPlan } from '../../../../../dominio/entidades/plan/plan.interface';
import { ClienteService } from '../../../../../infraestructura/service/cliente.service';
import { PlanService } from '../../../../../infraestructura/service/plan.service';
import { INuevoCliente } from '../../../../../dominio/entidades/cliente/cliente.inteface';



@Component({
  selector: 'app-nuevo-cliente',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule
  ],
  templateUrl: './nuevo-cliente.component.html',
})
export class NuevoClienteComponent implements OnInit {

  clienteForm: FormGroup;
  tipoDocumentos: any[] = [];
  listaPlan!:IPlan[];


  constructor(
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private clienteService: ClienteService,
    private planService: PlanService,
  ) {

    this.clienteForm = this.fb.group({
      primerNombreCliente: ['', Validators.required],
      segundoNombreCliente: [''],
      primerApellidoCliente: ['', Validators.required],
      segundoApellidoCliente: [''],
      tipoIdentificacionCliente: ['', Validators.required],
      numeroCedulaCliente: ['', Validators.required],
      direccionCliente: ['', Validators.required],
      telefonoCliente: this.fb.array([this.fb.control('')]),
      usuario: ['', Validators.required],
      plan:['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.obtenerTiposDocumentos();
    this.clienteForm.get('usuario')?.setValue(this.obtenerUsuario());
    this.obtenerPlanes();
  }

  get telefonos(): FormArray {
    return this.clienteForm.get('telefonoCliente') as FormArray;
  }

  agregarTelefono() {
    this.telefonos.push(this.fb.control(''));
  }

  guardarCliente() {

    if (this.clienteForm.valid) {

      const cliente: INuevoCliente = {
        primerNombreCliente: this.clienteForm.controls['primerNombreCliente'].value,
        segundoNombreCliente: this.clienteForm.controls['segundoNombreCliente'].value,
        primerApellidoCliente: this.clienteForm.controls['primerApellidoCliente'].value,
        segundoApellidoCliente: this.clienteForm.controls['segundoApellidoCliente'].value,
        tipoIdentificacionCliente: this.clienteForm.controls['tipoIdentificacionCliente'].value,
        numeroCedulaCliente: this.clienteForm.controls['numeroCedulaCliente'].value,
        direccionCliente: this.clienteForm.controls['direccionCliente'].value,
        telefonoCliente: this.clienteForm.controls['telefonoCliente'].value,
        usuario: this.clienteForm.controls['usuario'].value,
        idPlan: this.clienteForm.controls['plan'].value.idPlan
      }
      this.clienteService.crearCliente(cliente)
        .pipe(take(1))
        .subscribe({
          next: (resultado => {
            console.log('Cliente emitido:', resultado);
            this.dialogRef.close()
          }),
          error: (error) => {
            console.error('Error created clients:', error);
            alert(error.error.message)
          }
        })
    }
  }
  obtenerTiposDocumentos() {
    this.clienteService.obtenerTiposDocumentos()
    .pipe(take(1))
    .subscribe({
      next:(resultado => {
        this.tipoDocumentos = resultado;
      }),
      error: (error) =>{
        console.error('Error created clients:', error);
        // alert(error.error.message)
      }
    });
  }


  obtenerUsuario(): string{
    const usuarioGuardado = localStorage.getItem('user');
    const usuario = JSON.parse(usuarioGuardado!);
    console.log(usuario)
    return usuario[0].codigoUnicoUsuario;
  }

  async obtenerPlanes(){
    (await this.planService
    .obtenerPlanes())
    .pipe(take(1))
    .subscribe({
      next:(resultado:IPlan[]) =>{
        this.listaPlan = resultado
      },
      error: error=>{
        alert(error)
      }
    })
  }
}
