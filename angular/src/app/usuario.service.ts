import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<any>(null);  // Almacena el usuario en el estado
  //public usuario$ = this.usuarioSubject.asObservable();  // Expose el observable
  usuario$ = this.usuarioSubject.asObservable();

  private apiUrl = 'http://127.0.0.1:8000/api/login';

  constructor(private http: HttpClient) {
    // Intentar recuperar el usuario del localStorage al iniciar
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuarioSubject.next(JSON.parse(usuarioGuardado));
    }
  }

  setUsuario(usuario: any) {
    // Guardar en localStorage y actualizar el BehaviorSubject
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioSubject.next(usuario);
  }

  
  // Método para obtener la información del usuario
  getUsuario(): any {
    return this.usuarioSubject.value;  // Devuelve el último valor almacenado
  }

  // Método para enviar los datos de login
  login(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  // Método para verificar si el usuario está autenticado
  estaAutenticado(): boolean {
    return this.usuarioSubject.value !== null;
  }

  // Método para cerrar sesión
  logout(): void {
    this.usuarioSubject.next(null);  // Limpiar el estado del usuario
  }
  clearUsuario() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }
}
