<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Usuario;


class UsuarioController extends Controller
{
   protected $usuario;

   public function __construct() {
    $this->usuario  = new Usuario();  
   }

    public function index()
    {
        //return $this->usuario->all();
        return Usuario::all();


    }


    public function store(Request $request)
    {
        return $this->usuario->create($request->all());
    }


    public function show(string $id)
    {
        $usuario = $this->usuario->find($id);
        return $usuario;
    }


    public function update(Request $request, string $id)
    {
        $usuario = $this->usuario->find($id);
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
        $usuario->update($request->all());
        return $usuario;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $usuario = $this->usuario->find($id);
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
        $usuario->delete();
        return response()->json(['message' => 'Usuario eliminado correctamente']);
    }


}
