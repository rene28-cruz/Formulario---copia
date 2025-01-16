<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $primaryKey = 'codigo_producto';
    public $incrementing = true;

    protected $table = 'productos'; 

    protected $fillable = [
        'nombre',
        'descripcion',
        'marca',
        'foto_producto',
    ]; 
}