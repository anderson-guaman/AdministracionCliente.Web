import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

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
export class NuevoPlanComponent implements  OnInit{

  planForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ){}
  ngOnInit(): void {
    this.construirFormulario();
  }


  construirFormulario(){
    this.planForm = this.fb.group({
      nombrePlan: ['', Validators.required],
      capacidadPlan: ['',Validators.required],
      topeMensualPlan: ['', Validators.required],
    })
  }

  guardarPlan(){}
}
