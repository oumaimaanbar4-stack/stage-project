<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ShipmentController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\ModificationRequestController;


Route::post('/login', [AuthController::class, 'login']);

Route::post('/clients', [ClientController::class, 'store']);
Route::get('/clients', [ClientController::class, 'index']);
Route::get('/clients/archived', [ClientController::class, 'archived']);
Route::get('/clients/{id}', [ClientController::class, 'show']);


Route::post('/shipments', [ShipmentController::class, 'store']); // Create new shipment for a client
Route::get('/shipments', [ShipmentController::class, 'index']); // Get all shipments with client info
Route::put('/shipments/{id}/status', [ShipmentController::class, 'updateStatus']); // Update status


Route::get('/modification-requests', [ModificationRequestController::class, 'index']);
Route::post('/modification-requests', [ModificationRequestController::class, 'store']);
Route::put('/modification-requests/{id}', [ModificationRequestController::class, 'update']);


Route::delete('/clients/{id}', [ClientController::class, 'destroy']);
Route::put('/clients/{id}/restore', [ClientController::class, 'restore']);
Route::get('/clients/{id}/bordereaux', [ClientController::class, 'getBordereaux']);

Route::get('/users/archived', [AuthController::class, 'archivedUsers']);
Route::put('/users/{id}/restore', [AuthController::class, 'restoreUser']);
Route::delete('/users/{id}', [AuthController::class, 'destroy']); 

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
  Route::post('/logout', [AuthController::class, 'logout']);
  Route::get('/user', function (Request $request) {
    return $request->user();
  });
  Route::get('/all-users', function () {
    return \App\Models\User::all();
  });

  Route::post('/users', [AuthController::class, 'register']);
});
Route::middleware('auth:sanctum')->get('/admin/stats', [ProfileController::class, 'getStats']);
Route::middleware('auth:sanctum')->put('/user/update-password', [ProfileController::class, 'updatePassword']);
