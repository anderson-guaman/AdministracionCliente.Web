import { Component } from '@angular/core';
import { NavegacionComponent } from "../../shared/navegacion/navegacion.component";
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [NavegacionComponent,RouterOutlet],
  templateUrl: 'admin.component.html',
})
export class AdminComponent {


}
