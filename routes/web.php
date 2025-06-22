<?php

use App\Http\Controllers\Qurani\RedirectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get(
    '/', function () {
        return Inertia::render('main-page');
    }
)->name('home');

Route::get('redirect', RedirectController::class)->name('redirect');

