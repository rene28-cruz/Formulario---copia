<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductoController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;

// Define the POST route for login
Route::post('login', [AuthController::class, 'login']);
Route::get('/usuarios', [UsuarioController::class, 'index']);


// Rutas para productos
Route::prefix('productos')->group(function () {
    Route::get('/', [ProductoController::class, 'index']);
    Route::post('/', [ProductoController::class, 'store']);
    Route::get('/{codigo_producto}', [ProductoController::class, 'show']);
    //Route::match(['put', 'post'], '/{codigo_producto}', [ProductoController::class, 'update']);
    Route::put('/{codigo_producto}', [ProductoController::class, 'update']);  // PUT para actualización
    Route::delete('/{codigo_producto}', [ProductoController::class, 'destroy']);
});