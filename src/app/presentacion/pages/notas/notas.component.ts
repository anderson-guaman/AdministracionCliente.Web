import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-notas',
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './notas.component.html',
  }
)
export class NotasComponent {

  notas: number[] = [];
  nuevaNota: number = 0;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.notas = this.config.data.notas || [];
  }

  get promedio(): number {
    return this.notas.length > 0
      ? this.notas.reduce((a, b) => a + b, 0) / this.notas.length
      : 0;
  }

  agregarNota(): void {
    if (this.nuevaNota > 0) {
      this.notas.push(this.nuevaNota);
      this.nuevaNota = 0;
    }
  }
}
