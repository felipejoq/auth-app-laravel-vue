<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;

// Ruta para registrar usuarios
Route::post('/register', [AuthController::class, 'register']);

// Ruta para iniciar sesión
Route::post('/login', [AuthController::class, 'login']);

// Ruta para cerrar sesión (requiere autenticación)
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Ruta para obtener información del usuario autenticado (opcional)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
