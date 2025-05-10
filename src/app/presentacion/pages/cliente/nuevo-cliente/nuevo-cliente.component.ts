
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { INuevoCliente } from '../../../../dominio/entidades/cliente/cliente.inteface';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from '../../../../infraestructura/service/cliente.service';
import { take } from 'rxjs';



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


  constructor(
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private clienteService: ApiService,
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
      selectedDocument: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.obtenerTiposDocumentos();
  }

  get telefonos(): FormArray {
    return this.clienteForm.get('telefonoCliente') as FormArray;
  }

  agregarTelefono() {
    this.telefonos.push(this.fb.control(''));
  }

  guardarCliente() {
    if (this.clienteForm.valid) {

      const cliente: INuevoCliente = this.clienteForm.value;

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


}
