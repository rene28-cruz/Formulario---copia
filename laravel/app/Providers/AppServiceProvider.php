<?php

namespace App\Providers;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    public function boot()
    {
        parent::boot();

        // No es necesario usar la propiedad $this->namespace en Laravel 8 o superior
        Route::prefix('api')  // Opcional, puedes agregar un prefijo 'api' si lo deseas
             ->middleware('api')  // Agrega el middleware 'api' si lo deseas
             ->group(base_path('routes/api.php'));

        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
    }
}
