import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { ProductoService } from '../services/producto.service'; // Ruta correcta si está en la carpeta 'services'
import { Subscription } from 'rxjs';
import { Producto } from '../producto.interface'; // Importar la interfaz Producto
import { Router } from '@angular/router';
import { SearchService } from '../shared/search.service'; // Asegúrate de importar el servicio de búsqueda

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit, OnDestroy {
  nuevoProducto: Producto = {
    nombre: '',
    descripcion: '',
    marca: '',
    foto_producto: null
  };
  imagePreview: string | ArrayBuffer | null = null;

  productoEditado: Producto | null = null;
  usuarioCorreo: string = ''; // Variable para almacenar el correo del usuario
  private usuarioSubscription: Subscription;
  productos: any[] = []; // Variable para almacenar la lista de productos
  mensaje: string = ''; // Mensaje que se mostrará en el toast
  tipo: string = ''; // 'success' o 'error'
  filteredProductos: Producto[] = [];
  searchTerm: string = '';
  loading: boolean = false;  // Estado de carga
  error: string = '';  // Estado de error
  errorMessage: string | null = null; // Definimos la propiedad errorMessage
  isFormularioVisible: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private productoService: ProductoService, // Inyectamos el servicio de productos
    private router: Router,
    private searchService: SearchService
    
  ) {
    this.usuarioSubscription = this.usuarioService.usuario$.subscribe(usuario => {
      this.usuarioCorreo = usuario?.email || 'Usuario';
    });
  }
  cerrarSesion() {
    this.usuarioService.clearUsuario();
    this.router.navigate(['/login']);
  }     
  // Método de búsqueda para productos
  searchItems(): void {
    if (this.searchTerm.trim()) {
      this.filteredProductos = this.searchService.searchItems(
        this.productos,
        this.searchTerm,
        ['nombre', 'descripcion', 'marca']
      );
    } else {
      this.filteredProductos = [...this.productos];
    }
    }

  // Método para mostrar el formulario
  mostrarFormularioCreacion(): void {
    this.isFormularioVisible = true; // Cambia el valor de isFormularioVisible a true
    this.nuevoProducto = {
      nombre: '',
      marca: '',
      descripcion: '',
      foto_producto: null
    };
  }

  // Método para ocultar el formulario
  ocultarFormularioCreacion(): void {
    this.isFormularioVisible = false; // Cambia el valor de isFormularioVisible a false
    this.resetFormulario();
  }
  
  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuarioCorreo = usuario.email; // Asegúrate de que 'email' existe en el objeto usuario
    } else {
      this.usuarioCorreo = 'Usuario'; // Valor predeterminado en caso de no encontrar usuario
    }

  // Cargar productos (si aplica)
    this.getProductos();
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción cuando el componente se destruya
    if (this.usuarioSubscription) {
      this.usuarioSubscription.unsubscribe();
    }
  }

  mostrarMensaje(mensaje: string): void {
    alert(mensaje); // Aquí puedes usar un alert o algo más avanzado
  }
  selectedFile: File | null = null;

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Guardamos el archivo seleccionado
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        
        if (this.productoEditado) {
          this.productoEditado.foto_producto = file;
        } else {
          this.nuevoProducto.foto_producto = file;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  getProductos(): void {
    this.productoService.getProductos().subscribe(
      (productos) => {
        this.productos = productos;
        this.filteredProductos = productos; // Inicializar filteredProductos con todos los productos
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
    this.productoEditado = null;
  }

  createProducto(): void {
    const formData = new FormData();
    formData.append('nombre', this.nuevoProducto.nombre);
    formData.append('descripcion', this.nuevoProducto.descripcion);
    formData.append('marca', this.nuevoProducto.marca);
  
    if (this.nuevoProducto.foto_producto) {
      formData.append('foto_producto', this.nuevoProducto.foto_producto);
    }
  
    this.productoService.createProducto(formData).subscribe(
      (response) => {
        // Agregar el nuevo producto a la lista de productos local
        this.productos.push(response);  // Asumiendo que el backend devuelve el producto recién creado
  
        // Actualizar filteredProductos para incluir el nuevo producto
        this.filteredProductos = this.productos.filter(p => 
          p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          p.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          p.marca.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
  
        this.mostrarMensaje('Producto creado con éxito');
        this.resetFormulario(); // Restablecer el formulario
      },
      (error) => {
        console.error('Error al crear producto:', error);
        this.mostrarMensaje('Hubo un error al crear el producto');
      }
    );
  }
  
updateProducto(): void {
  if (!this.productoEditado || !this.productoEditado.codigo_producto) {
    this.mostrarMensaje('No hay producto para actualizar');
    return;
  }

  const formData = new FormData();

  // Añadir todos los campos al FormData
  formData.append('nombre', this.productoEditado.nombre);
  formData.append('descripcion', this.productoEditado.descripcion);
  formData.append('marca', this.productoEditado.marca);

  // Si hay una nueva imagen seleccionada, añadirla
  if (this.selectedFile) {
    formData.append('foto_producto', this.selectedFile);
  }

  this.productoService.updateProducto(this.productoEditado.codigo_producto, formData)
    .subscribe({
      next: (response) => {
        console.log('Respuesta exitosa:', response);

        // Verificar que productoEditado no sea null y actualizar la lista de productos
        const index = this.productos.findIndex(p => p.codigo_producto === this.productoEditado?.codigo_producto);
        if (index !== -1) {
          this.productos[index] = { ...this.productoEditado, ...response }; // Actualizar los datos del producto con la respuesta
          this.filteredProductos = this.searchTerm ? this.productos.filter(p => 
            p.nombre.includes(this.searchTerm) || p.descripcion.includes(this.searchTerm) || p.marca.includes(this.searchTerm)
          ) : [...this.productos]; // Si hay término de búsqueda, aplicar el filtro
        }
        // Mostrar mensaje de éxito y restablecer el formulario
        this.mostrarMensaje('Producto actualizado con éxito');
        this.resetFormulario();
        // Limpiar la imagen seleccionada
        this.selectedFile = null;
      },
      error: (error) => {
        console.error('Error completo:', error);
        let mensaje = 'Hubo un error al actualizar el producto';
        if (error.error?.message) {
          mensaje = error.error.message;
        } else if (error.error?.error) {
          mensaje = error.error.error;
        }
        this.mostrarMensaje(mensaje);
      }
    });
}

  // Método para editar un producto
  editProducto(producto: Producto): void {
    // Verificar si el producto existe antes de proceder
    if (!producto) {
      console.error('Producto inválido:', producto);
      return;
    }
  
    // Guardar los datos del producto en el formulario de edición
    this.productoEditado = {
      codigo_producto: producto.codigo_producto,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      marca: producto.marca,
      foto_producto: producto.foto_producto
    };
  
    // Resetear el archivo seleccionado
    this.selectedFile = null;
  
    // Manejar la previsualización de la imagen
    if (typeof producto.foto_producto === 'string') {
      // Si foto_producto es una URL (string), la asignamos directamente
      this.imagePreview = producto.foto_producto;
    } else if (producto.foto_producto instanceof File) {
      // Si es un archivo, generamos una previsualización
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(producto.foto_producto);
    } else {
      // Si no hay imagen, establecemos el valor como null
      this.imagePreview = null;
    }
  }
  // Método para eliminar un producto
  deleteProducto(codigo_producto: number): void {
    this.productoService.deleteProducto(codigo_producto).subscribe(
      (response) => {
        // Eliminar producto del array local 'productos' directamente
        this.productos = this.productos.filter(producto => producto.codigo_producto !== codigo_producto);
  
        // Actualizar filteredProductos inmediatamente después de la eliminación
        this.filteredProductos = this.productos.filter(p => 
          p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          p.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          p.marca.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
  
        // Mostrar mensaje de éxito
        this.mostrarMensaje('Producto eliminado con éxito');
      },
      (error) => {
        this.mostrarMensaje('Hubo un error al eliminar el producto');
      }
    );
  }
  // Método para limpiar el formulario
  resetFormulario(): void {
    this.nuevoProducto = {
      nombre: '',
      descripcion: '',
      marca: '',
      foto_producto: null
    };
    this.imagePreview = null;
    this.productoEditado = null;
    this.selectedFile = null; // Limpiamos el archivo seleccionado
  }
}
