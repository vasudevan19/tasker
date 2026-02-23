<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Middleware\JwtFromCookie;
use Illuminate\Support\Facades\Route;


Route::post('/user', [AuthController::class, 'create'])->withoutMiddleware(Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class);
Route::post('/login', [AuthController::class, 'login'])->withoutMiddleware(Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->withoutMiddleware(Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class);
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->withoutMiddleware(Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class);
Route::post('/refresh', [AuthController::class, 'refresh'])->withoutMiddleware(Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class);

Route::get('/csrf-cookie', function () {
    return response()->json(['csrf' => true]);
});

Route::group([

    'middleware' => [JwtFromCookie::class,'auth:api'],

], function () {
    Route::post('/logout', [AuthController::class, 'logout'])->withoutMiddleware(Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class);
    Route::get('/users', [AuthController::class, 'users']);
    Route::get('/user', [AuthController::class, 'user']);

    //task routes
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'create']);
    Route::get('/task/{id}', [TaskController::class, 'show']);
    Route::put('/task/{id}', [TaskController::class, 'update']);
    Route::delete('/task/{id}', [TaskController::class, 'delete']);
    Route::patch('/task/status/{id}', [TaskController::class, 'updateStatus']);
});