<?php

namespace App\Http\Controllers;

use App\Handler\JsonResponseHandler;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        $payload = $request->all();
        $password = Hash::make($payload['password']);
        $user = User::create([
            'username' => $payload['username'],
            'password' => $password,
            'email' => $payload['email'],
            'role' => $payload['role'],
            'email_verified_at' => date("Y-m-d h:i:s")
        ]);
        return JsonResponseHandler::setStatus(200)->setResult($user)->setMessage("Berhasil")->send();
        
    }
    public function login(Request $request){
        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required']
        ]);
        if(! $token = Auth::attempt($credentials)){
            return JsonResponseHandler::setStatus(400)->setMessage("Username atau password salah!")->send();
        }
        $user = User::where('username',$request->username)->first();
        $result = [
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ];
        return JsonResponseHandler::setStatus(200)->setResult($result)->setMessage("Berhasil")->send();


    }
}
