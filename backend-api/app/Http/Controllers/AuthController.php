<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function create(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email'    => 'required|max:255|email',
            'password' => 'required|min:4|max:10',
            'password_confirmation' => 'required|same:password',
        ], [
            'password_confirmation.same' => 'Password mismatch.'
        ])->validate();

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'User account created.'
        ], 201);
    }

    public function login(Request $request)
    {
        $validated = Validator::make(
            $request->only('email', 'password'),
            [
                'email' => 'required|email|max:255',
                'password' => 'required|min:4|max:10'
            ]
        )->validate();

        if (!$token = Auth::attempt($validated)) {
            return response()->json(['status' => 'error', 'message' => 'Invalid Credentials'], 400);
        }

        return response()
        ->json([
            'status' => 'success',
            'message' => 'Successfully logged in'
        ])
        ->cookie(
            'access_token',
            $token,
            60 * 24,
            '/',
            null,
            true,   // secure ⭐
            true,   // httpOnly ⭐
            false,
            'None'  // VERY IMPORTANT for Vercel + Render
        );
    }

    public function forgotPassword(Request $request)
    {
        $validated = Validator::make(
            $request->only('email'),
            [
                'email' => 'required|email|max:255',
            ]
        )->validate();

        $status = Password::sendResetLink($validated);

        if ($status == Password::ResetLinkSent) {
            return response()->json(['message' => 'Reset Link Sent Successfully']);
        } else {
            return response()->json(['message' => 'Reset link not able to sent'], 400);
        }
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:4|max:10',
            'password_confirmation' => 'required|same:password',
        ]);

        $status = Password::reset($request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ]);
                $user->save();
            }    
        );

        if ($status == Password::PasswordReset) {
            return response()->json(['message' => 'Password reset successfull']);
        } else {
            return response()->json(['message' => 'Reset not successfull'], 400);
        }
    }
    public function refresh(Request $request)
    {
        $token = $request->cookie('access_token');
        if (!$token) {
            return response()->json(['message' => 'No token'], 401);
        }
        $newToken = Auth::setToken($token)->refresh();
        return response()->json([
            'status' => 'success',
            'message' => 'Token Refreshed Successfully',
        ])
            ->cookie(
                'access_token',
                $newToken,
                60 * 24,
                '/',
                null,
                true,   // secure ⭐
                true,   // httpOnly ⭐
                false,
                'None'  // VERY IMPORTANT for Vercel + Render
            );
    }

    public function logout()
    {
        Auth::logout();

        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ])->cookie('access_token', '', -1);
    }

    public function users()
    {
        $users = User::get();

        return response()->json([
            'status' => 'success',
            'data' => $users,
        ]);
    }

    public function user()
    {
        $authUser = Auth::user();
        return response()->json([
            'status' => 'success',
            'message' => 'User profile retrieved',
            'user' => $authUser,
        ]);
    }
}
