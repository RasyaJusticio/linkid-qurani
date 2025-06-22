<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('main-page');
})->name('home');

Route::get('redirect', function () {
    return Inertia::render('redirect');
})->name('redirect');

