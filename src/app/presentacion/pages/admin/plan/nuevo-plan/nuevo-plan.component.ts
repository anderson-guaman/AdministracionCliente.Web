import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { PlanService } from '../../../../../infraestructura/service/plan.service';
import { IPlan } from '../../../../../dominio/entidades/plan/plan.interface';
import { take } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-nuevo-plan',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    DropdownModule
  ],
  templateUrl: './nuevo-plan.component.html',
})
export class NuevoPlanComponent implements OnInit {

  planForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private planService: PlanService,
    private dialogRef: DynamicDialogRef,
  ) { }
  ngOnInit(): void {
    this.construirFormulario();
  }


  construirFormulario() {
    this.planForm = this.fb.group({
      nombrePlan: ['', Validators.required],
      capacidadPlan: ['', Validators.required],
      topeMensualPlan: ['', Validators.required],
    })
  }

  guardarPlan() {
    if (this.planForm.valid) {
      const datos = this.planForm.getRawValue();
      const dto: IPlan = {
        idPlan: 0,
        nombre: datos.nombrePlan,
        velocidadMbps: datos.capacidadPlan,
        topeMensualGB: datos.topeMensualPlan,
      }

      this.planService.crearPlan(dto)
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
}
