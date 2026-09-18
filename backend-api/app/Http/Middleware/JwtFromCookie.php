<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Middleware\EncryptCookies;


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

        info('Header X-XSRF-TOKEN:', [EncryptCookies::decryptStatic($request)]);

        if ($token) {
            $request->headers->set('Authorization', 'Bearer ' . $token);
        }
        
        $response = $next($request);

        // 2. Retrieve all outgoing cookies attached to the response
        $cookies = $response->headers->getCookies();

        foreach ($cookies as $cookie) {
            info('Outgoing Cookie:', [
                'name' => $cookie->getName(),
                'value' => $cookie->getValue(),
                'domain' => $cookie->getDomain(),
                'path' => $cookie->getPath(),
                'expires' => $cookie->getExpiresTime(),
            ]);
        }

        return $response;
    }
}
