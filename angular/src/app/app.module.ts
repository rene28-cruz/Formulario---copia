import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Para usar ngModel en los formularios
import { HttpClientModule } from '@angular/common/http'; // Para hacer solicitudes HTTP
import { AppRoutingModule } from './app-routing.module'; // Asegúrate de importar el AppRoutingModule
import { AppComponent } from './app.component'; // Standalone component
import { BienvenidaComponent } from './bienvenida/bienvenida.component'; // Check if this is standalone
import { LayoutComponent } from './layout/layout.component';
import { ToastComponent } from './toast/toast.component';  // Asegúrate de importar el ToastComponent
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    LayoutComponent,
    AppComponent,
    BienvenidaComponent,
    ToastComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Para vincular los formularios con el componente
    HttpClientModule, // Para habilitar las solicitudes HTTP
    AppRoutingModule,// Usa AppRoutingModule para manejar las rutas
  ],
  providers: [DatePipe],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
