<?php

use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/todos', [TodoController::class, 'show']);

Route::delete('/todos/{id}', [TodoController::class, 'remove']);

Route::post('/todos', [TodoController::class, 'add']);

Route::put('/todos/{id}', [TodoController::class, 'toggle']);

Route::put('/todos', [TodoController::class, 'update']);

Route::post('/todos/{id}', [TodoController::class, 'saveImage']);

Route::fallback(function () {
    return view('404');
});
