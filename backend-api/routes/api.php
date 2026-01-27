<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;


Route::post('/user', [AuthController::class, 'create']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/refresh', [AuthController::class, 'refresh']);

Route::group([

    'middleware' => ['auth:api'],

], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
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