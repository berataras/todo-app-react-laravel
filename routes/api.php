<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\TaskController;
use App\Http\Middleware\Authenticate;

Route::post('login', [LoginController::class, 'login']);


Route::post('tasks', [TaskController::class, 'getTasks']);
Route::post('tasks/store', [TaskController::class, 'store']);
Route::post('tasks/update', [TaskController::class, 'update']);
Route::get('tasks/delete/{id}', [TaskController::class, 'delete']);

