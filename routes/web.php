<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});

Route::get('/{any}', function () {
    return view('app'); // Asegúrate de que 'app' sea el nombre de tu vista principal
})->where('any', '.*');
