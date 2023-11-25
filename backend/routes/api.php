<?php

use App\Http\Controllers\api\chargeController;
use App\Http\Controllers\api\currencyController;
use App\Http\Controllers\api\uomController;
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

Route::get('getCurrency', [currencyController::class, 'index']);
Route::get('getUom', [uomController::class, 'index']);
Route::get('getCharge', [chargeController::class, 'index']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
