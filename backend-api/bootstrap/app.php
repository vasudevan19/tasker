<?php

use App\Http\Middleware\JwtFromCookie;
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
        $middleware->trustHosts(at: ['localhost', '127.0.0.1']); // add vercel hosts here when deployed
        // $middleware->alias([
        //     'jwt.cookie' => JwtFromCookie::class,
        // ]);
        $middleware->prependToGroup('api', JwtFromCookie::class);
        $middleware->appendToGroup('api', [StartSession::class, ValidateCsrfToken::class]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
