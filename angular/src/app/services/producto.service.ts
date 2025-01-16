import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8000/api/productos';

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
    // Método para subir la imagen
    subirImagen(imagen: File): Observable<any> {
      const formData = new FormData();
      formData.append('foto_producto', imagen, imagen.name);  
  
      return this.http.post<any>('http://localhost:8000/api/subir-imagen', formData);
    }

  // Obtener un solo producto
  getProducto(codigo_producto: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${codigo_producto}`);
  }

  // Crear un nuevo producto
  createProducto(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  updateProducto(codigo_producto: number, formData: FormData): Observable<any> {

    console.log('Datos enviados:', {codigo_producto,formDataEntries: Array.from(formData.entries())
    });
    formData.append('_method', 'PUT');

    return this.http.post(`${this.apiUrl}/${codigo_producto}`, formData)
        .pipe(
            tap(response => console.log('Respuesta del servidor:', response)),
            catchError(error => {
                console.error('Error en la actualización:', error);
                throw error;
            })
        );

  }

  // Eliminar un producto
  deleteProducto(codigo_producto: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${codigo_producto}`);
  }
}