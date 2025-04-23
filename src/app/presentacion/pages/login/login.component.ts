import { Component } from '@angular/core';
import { AuthService } from '../../../infraestructura/service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,ButtonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/']); // Redirige al usuario a la página principal
      } else {
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
