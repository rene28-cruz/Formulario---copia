import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AppComponent } from './app.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', component: AppComponent },
      { path: 'bienvenida', component: BienvenidaComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'usuarios', component: UsuariosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }