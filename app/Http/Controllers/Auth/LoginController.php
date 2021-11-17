<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\AuthenticationToken;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class LoginController extends Controller
{

    use AuthenticatesUsers;

    protected $redirectTo = RouteServiceProvider::HOME;

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    function createToken(){
        for ($x = 0; $x < 10; $x ++) {
            return Str::random(30);
        }
    }

    public function login(Request $request){
        if (Auth::attempt($request->only('username', 'password'))){
            $token = $this->createToken();
            AuthenticationToken::create(['token' => $token, 'user' => $request->user()->id]);
            return ['user' => $request->user(), 'token' => $token];
        }else{
            return  response('unauth', 401);
        }

    }
}
