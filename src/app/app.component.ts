import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { NavegacionComponent } from "./presentacion/shared/navegacion/navegacion.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavegacionComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

  constructor(
    private primeng: PrimeNG
  ){}

  ngOnInit(): void {
    this.primeng.ripple.set(true);
  }
}
