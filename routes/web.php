<?php

use App\Http\Controllers\Qurani\AppLoadController;
use App\Http\Controllers\Qurani\RedirectController;
use App\Http\Controllers\Qurani\MainPageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', AppLoadController::class);
Route::get('home', MainPageController::class)->name('home');
Route::get('redirect', RedirectController::class)->name('redirect');

