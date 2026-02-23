<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JwtFromCookie
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->cookie('access_token');
        info('token', [$token]);
        if ($token) {
            $request->headers->set('Authorization', 'Bearer '.$token);
        }
        info('jwtfromcookie');
        info('jwtfromcookie', [$request->headers->get('Authorization')]);
        return $next($request);
    }
}
