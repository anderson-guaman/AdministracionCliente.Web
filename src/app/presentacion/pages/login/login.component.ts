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

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin(): void {
    if (!this.username || !this.password) {
      this.error = 'Por favor ingrese usuario y contraseña';
      return;
    }

    this.authService.login(this.username, this.password).subscribe(success => {
      if (success && this.isAdmin()) {
        this.router.navigate(['/admin']);
      } else if(success){
        this.router.navigate(['/consumo']);
      }else {
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }

  isAdmin():boolean{
    const usuarioString = localStorage.getItem('user');
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;
    if(usuario[0].usuario === 'admin') {
      return true
    }
    return false
  }

}
