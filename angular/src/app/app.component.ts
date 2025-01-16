import { Component } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mensaje: string = '';  // Mensaje del toast
  tipo: string = '';     // Tipo de mensaje (ej. 'exito', 'error', etc.)
  loginData = {
    email: '',  // Aquí definimos el campo email
    password: '' // Si necesitas otros campos, agrégales aquí
  };

  errorMessage: string | null = null;  // Definimos la propiedad errorMessage

  // Método que establece el errorMessage, por ejemplo cuando haya un error de login
  setErrorMessage(message: string): void {
    this.errorMessage = message;
  }

  mostrarToast(mensaje: string, tipo: string) {
    this.mensaje = mensaje;
    this.tipo = tipo;
  }
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  onSubmit() {
    console.log('Router:', this.router);  // Verifica el router
    console.log('Login Data:', this.loginData);  // Verifica los datos de login
  
    // Realiza el login llamando al servicio
    this.usuarioService.login(this.loginData).subscribe(
      (response) => {
        console.log('Login exitoso', response);  // Verifica la respuesta
  
        // Asegúrate de que 'response.user' tenga la propiedad 'correo'
        if (response && response.user && response.user.correo) {
          localStorage.setItem('usuario', JSON.stringify({ email: response.user.correo }));
          console.log('Correo guardado en localStorage:', response.user.correo);
        } else {
          console.error('No se encontró el correo en la respuesta');
        }
  
        // Redirige al componente 'bienvenida' si el login es exitoso
        this.router.navigate(['/bienvenida']).then((result) => {
          console.log('Redirigido a bienvenida:', result);
        }).catch((err) => {
          console.error('Error en redirección:', err);
        });
      },
      (error) => {
        console.error('Error de login', error);
        this.errorMessage = 'Inicio de sesión fallido. Verifica tus credenciales e intenta nuevamente.';
      }
    );
  }
  
}
