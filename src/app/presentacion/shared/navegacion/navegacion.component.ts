import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  imports: [RouterModule,NgIf],
  templateUrl: './navegacion.component.html',
})
export class NavegacionComponent {
  desplegar = false;

  toggleDropdown(): void {
    if(this.desplegar){
      this.desplegar = false
    }else{
      this.desplegar = true
    }
  }
}
