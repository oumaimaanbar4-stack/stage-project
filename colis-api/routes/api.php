<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// This is the URL React will call: http://127.0.0.1:8000/api/login
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (require the Token)
Route::middleware('auth:sanctum')->group(function () {
  Route::post('/logout', [AuthController::class, 'logout']);
  Route::get('/user', function (Request $request) {
    return $request->user();
  });
});
