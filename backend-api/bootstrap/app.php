<?php

use App\Http\Middleware\EncryptCookies;
use App\Http\Middleware\JwtFromCookie;
use App\Http\Middleware\VerifyCustomCsrf;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use Illuminate\Session\Middleware\StartSession;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->trustHosts(at: ['localhost', '127.0.0.1', 'tasker-f2ay.onrender.com']); // add vercel hosts here when deployed
        // $middleware->alias([
        //     'jwt.cookie' => JwtFromCookie::class,
        // ]);
        $middleware->appendToGroup('api', [
            EncryptCookies::class,
            VerifyCustomCsrf::class,
            JwtFromCookie::class,
        ]);

        $middleware->priority([
            EncryptCookies::class,
            VerifyCustomCsrf::class,
            JwtFromCookie::class,
            Authenticate::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
