<?php

namespace App\Http\Middleware;

use App\Models\AuthenticationToken;
use Illuminate\Http\Request;

class Authenticate
{
    public function handle(Request $request)
    {

        $isToken = AuthenticationToken::where('token', $request->token)->first();

        if ($isToken){
            return response('success', 201);
        }else{
            return response('unauth', 401);
        }
    }
}
