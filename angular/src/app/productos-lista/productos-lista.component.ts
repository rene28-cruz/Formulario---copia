import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-productos-lista',
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.css']
})
export class ProductosListaComponent implements OnInit {
  productos: any[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productoService.getProductos().subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al cargar los productos', error);
      }
    );
  }

  deleteProducto(codigo_producto: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.deleteProducto(codigo_producto).subscribe(
        () => {
          this.productos = this.productos.filter(producto => producto.codigo_producto !== codigo_producto);
        },
        (error) => {
          console.error('Error al eliminar el producto', error);
        }
      );
    }
  }
}
