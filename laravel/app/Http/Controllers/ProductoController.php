<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProductoController extends Controller
{
    // Mostrar todos los productos
    public function index()
    {
        $productos = Producto::all();
        foreach ($productos as $producto) {
            if ($producto->foto_producto) {
                $producto->foto_producto_url = asset('storage/' . $producto->foto_producto);
            }
        }
        return $productos;
    }

    // Crear un nuevo producto
    public function store(Request $request)
    {
        try {
            // Validación de los datos de entrada
            $validatedData = $request->validate([
                'nombre' => 'required|string|max:255',
                'descripcion' => 'required|string',
                'marca' => 'required|string',
                'foto_producto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
            

            // Crear una nueva instancia de Producto
            $producto = new Producto();
            $producto->fill($validatedData);

            // Manejar la imagen si se proporciona
            if ($request->hasFile('foto_producto')) {
                // Eliminar la imagen anterior si existe
                if ($producto->foto_producto) {
                    Storage::disk('public')->delete($producto->foto_producto);
                }
            
                $imagePath = $request->file('foto_producto')->store('productos', 'public');
                $producto->foto_producto = $imagePath;
            }
            $producto->save();

            $producto->foto_producto_url = $producto->foto_producto ? 
                asset('storage/' . $producto->foto_producto) : null;

            return response()->json($producto, 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear el producto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Mostrar un producto específico
    public function show($codigo_producto)
    {
        try {
            $producto = Producto::find($codigo_producto);

            if (!$producto) {
                return response()->json(['message' => 'Producto no encontrado'], 404);
            }

            $producto->foto_producto_url = $producto->foto_producto ? 
                asset('storage/' . $producto->foto_producto) : null;

            return response()->json($producto);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener el producto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Actualizar un producto
    public function update(Request $request, $codigo_producto)
    {
        $producto = Producto::findOrFail($codigo_producto);

         // Depurar los datos recibidos
        try {
            $producto = Producto::find($codigo_producto);

            if (!$producto) {
                return response()->json(['message' => 'Producto no encontrado'], 404);
            }
            Log::info('Datos recibidos para actualizar', $request->all());
            Log::info('Imagen antes de la actualización:', [$producto->foto_producto]);



            // Validar los datos de entrada
            $data = $request->validate([
                'nombre' => 'required|string|max:255',
                'descripcion' => 'required|string',
                'marca' => 'required|string',
                'foto_producto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
                // Actualizar los campos del producto
            $producto->nombre = $data['nombre'];
            $producto->descripcion = $data['descripcion'];
            $producto->marca = $data['marca'];
            Log::info('Datos validados:', $data); 

            // Manejar la imagen si se proporciona una nueva
            if ($request->hasFile('foto_producto')) {
                // Eliminar la imagen anterior si existe
                if ($producto->foto_producto) {
                    Storage::disk('public')->delete($producto->foto_producto);
                }

                $imagePath = $request->file('foto_producto')->store('productos', 'public');
                $producto->foto_producto = $imagePath;
            }

            $producto->save();
            Log::info('Producto guardado correctamente:', $producto->toArray());


            // Agregar la URL de la imagen a la respuesta
            $producto->foto_producto_url = $producto->foto_producto ? 
                asset('storage/' . $producto->foto_producto) : null;

            return response()->json($producto);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar el producto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Eliminar un producto
    public function destroy($codigo_producto)
    {
        try {
            $producto = Producto::find($codigo_producto);

            if (!$producto) {
                return response()->json(['message' => 'Producto no encontrado'], 404);
            }

            // Eliminar la imagen si existe
            if ($producto->foto_producto) {
                Storage::disk('public')->delete($producto->foto_producto);
            }

            $producto->delete();

            // Reiniciar el autoincremento
            DB::statement('ALTER TABLE productos AUTO_INCREMENT = 1');

            return response()->json(['message' => 'Producto eliminado exitosamente']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar el producto',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}