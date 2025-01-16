import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../shared/search.service';

interface Usuario {
  id: number;
  correo: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  error: string | null = null;

  constructor(private http: HttpClient, private searchService: SearchService) {}

  ngOnInit() {
    this.getUsuarios();
  }

  // Obtener usuarios
  getUsuarios() {
    this.loading = true;
    this.http.get<Usuario[]>('http://localhost:8000/api/usuarios').subscribe(
      (data) => {
        this.usuarios = data;
        this.filteredUsuarios = [...data]; 
        this.loading = false;
      },
      (error) => {
        this.error = 'Error al obtener usuarios';
        console.error('Error al obtener usuarios:', error);
        this.loading = false;
      }
    );
  }

  // Método de búsqueda 
  searchItems(): void {
    this.filteredUsuarios = this.searchService.searchItems(
      this.usuarios,
      this.searchTerm,
      ['correo']
    );
  }
}
