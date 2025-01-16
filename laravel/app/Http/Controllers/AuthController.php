<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $user = DB::table('usuarios')
            ->where('correo', $request->email)
            ->first();

        if ($user && Hash::check($request->password, $user->contrasena)) {
            return response()->json([
                'message' => 'Login exitoso',
                'user' => $user
            ], 200);
        }

        return response()->json([
            'message' => 'Credenciales incorrectas'
        ], 401);
    }
}