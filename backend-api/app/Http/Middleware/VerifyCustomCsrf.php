<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyCustomCsrf
{
   public function handle(
        Request $request,
        Closure $next
    ): Response {
        // Only protect state-changing requests.
        if (in_array($request->method(), [
            'POST',
            'PUT',
            'PATCH',
            'DELETE',
        ], true)) {

            $cookieToken = $request->cookie('tasker_csrf');
            $headerToken = $request->header('X-CSRF-TOKEN');

            if (
                !$cookieToken ||
                !$headerToken ||
                !hash_equals($cookieToken, $headerToken)
            ) {
                return response()->json([
                    'message' => 'CSRF token mismatch.',
                ], 419);
            }
        }

        return $next($request);
    }
}
