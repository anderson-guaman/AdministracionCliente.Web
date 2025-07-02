import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiMicro } from '../../dominio/enum/enum-dominio';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private http: HttpClient,
  ){}

  login(username: string, password: string): Observable<boolean> {
    console.log(password);
    // Realiza una solicitud GET al backend para obtener el usuario
    return this.http.get<any>(`${environment.baseUrl}/${ApiMicro.AdministracionClienteMicro}/${username}`)
      .pipe(
        map(response => {
          if (response[0].usuario === username && response[0].constrasena === password) {
            this.isAuthenticated = true;
            localStorage.setItem('isAuthenticated', 'true'); // Guarda el estado en localStorage
            localStorage.setItem('user', JSON.stringify(response)); // Guarda el usuario en localStorage
            return true;
          }
          return false;
        })
      );
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated'); // Limpia el estado de autenticación
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const usuarioString = localStorage.getItem('user');
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;
    // this.isAuthenticated = storedAuth === 'true';
    if(storedAuth === 'true' && usuario.usuario == 'admin') {
      this.isAuthenticated = true
    }else{
      this.isAuthenticated = false
    }
    return this.isAuthenticated;
  }
}
