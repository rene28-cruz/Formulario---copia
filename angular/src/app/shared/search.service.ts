import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  // Método genérico de búsqueda
  searchItems<T>(items: T[], searchTerm: string, keys: (keyof T)[]): T[] {
    console.log('Término de búsqueda:', searchTerm);  // Verifica que searchTerm no esté vacío
    if (!searchTerm.trim()) {
      console.log('Término de búsqueda vacío, retornando todos los productos');
      return items; // Si no hay término de búsqueda, devuelve todos los items
    }
  
    const lowerSearchTerm = searchTerm.toLowerCase();
    //console.log('Término de búsqueda en minúsculas:', lowerSearchTerm);
  
    return items.filter(item => {
      return keys.some(key => {
        const value = item[key];
        //console.log(`Buscando en ${String(key)} con valor:`, value);  // Convertir la clave a string
  
        if (value && typeof value === 'string') {
          return value.toLowerCase().includes(lowerSearchTerm);
        } else if (value) {
          return value.toString().toLowerCase().includes(lowerSearchTerm);
        }
        return false;
      });
    });
  }
  
}
