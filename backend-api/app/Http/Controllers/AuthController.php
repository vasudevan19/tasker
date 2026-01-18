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
            'password' => 'required|min:4|max:10|confirmed',
        ], [
            'password.confirmed' => 'Password mismatch.'
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
            return response()->json(['status' => 'error', 'message' => 'Invalid Credentials'], 401);
        }
        info('payload', [Auth::payload()]);

        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged in',
            'access_token' => $token,
            'token_type' => 'bearer',
        ]);
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
            'password' => 'required|min:4|max:10|confirmed',
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
}
