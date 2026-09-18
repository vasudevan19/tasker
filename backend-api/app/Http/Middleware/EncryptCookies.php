<?php

namespace App\Http\Middleware;

use Illuminate\Cookie\Middleware\EncryptCookies as Middleware;
use Symfony\Component\HttpFoundation\Request;

class EncryptCookies extends Middleware
{
    // XSRF-TOKEN must stay encrypted so it round-trips through getTokenFromRequest()'s decrypt() call.
    protected $except = [];

    public static function decryptCookieStatic($cookie)
    {
        return (new self(app('encrypter')))->decryptCookie('XSRF-TOKEN', $cookie);
    }
}