<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ProductoController;

// Ruta para mostrar el formulario de login
Route::get('/login', function () {
    return view('auth.login');
})->name('login.show');
Route::get('/productos', [ProductoController::class, 'index']);

// Ruta para procesar el login
Route::post('/login', [AuthController::class, 'login'])->name('login');

// Rutas de usuarios
Route::apiResource('usuario', UsuarioController::class);