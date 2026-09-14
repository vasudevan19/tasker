<?php

namespace App\Http\Middleware;

use Illuminate\Cookie\Middleware\EncryptCookies as Middleware;

class EncryptCookies extends Middleware
{
    // XSRF-TOKEN must stay encrypted so it round-trips through getTokenFromRequest()'s decrypt() call.
    protected $except = [];
}