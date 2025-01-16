<?php
namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'api/usuario',           // Excluir la ruta /api/usuario (GET, POST, etc.)
        'api/usuario/*',         // Excluir todas las rutas dentro de /api/usuario/{id}
    ];
}