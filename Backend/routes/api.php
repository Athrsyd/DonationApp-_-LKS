<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DonationController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('/v1')->group(function(){

    Route::get('/auth/login',[UserController::class, "login"]);

    Route::get("/donation",[DonationController::class,"index"]);
    Route::get("/donation/{id}",[DonationController::class,"show"]);
    Route::post("/donation",[DonationController::class,"store"]);
    Route::get('/auth/me',[UserController::class,'me']);

    Route::middleware('auth:sanctum')->group(function(){
        Route::delete('/donation/{id}',[DonationController::class, "destroy"]);
        Route::get("/auth/logout",[UserController::class,'logout']);
    });
});