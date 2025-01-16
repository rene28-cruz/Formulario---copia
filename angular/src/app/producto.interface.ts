// src/app/producto.interface.ts

export interface Producto {
    codigo_producto?: number;  // Esta propiedad es opcional ya que es autoincremental
    nombre: string;
    descripcion: string;
    marca: string;
    foto_producto: string  | File | null;  // El tipo File permite adjuntar una imagen
  }
  