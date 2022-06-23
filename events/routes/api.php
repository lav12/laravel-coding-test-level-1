<?php

use App\Http\Controllers\Api\V1\EventController;
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

use App\Http\Controllers\Api\V1\AuthController;

Route::group([
    "prefix" => "/v1",
], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
});



// Verify email
Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');

// Resend link to verify email
Route::post('/email/verify/resend', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');

Route::group([
    'middleware' => 'auth:sanctum',
    "prefix" => "/v1",
], function () {
    // get
    Route::get('/events', [EventController::class, 'index']);
    Route::get('/events/active-events', [EventController::class, 'getActiveEvents']);
    Route::get('/events/{id}', [EventController::class, 'show']);

    // post
    Route::post('/events', [EventController::class, 'store']);

    // put - if not exist, create new record
    Route::put('/events/{id}', [EventController::class, 'update']);

    // patch - only update
    Route::patch('/events/{id}', [EventController::class, 'updateEvent']);

    // delete
    Route::delete('/events/{id}', [EventController::class, 'destroy']);

});
