<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'

        ]);
        if ($validate->fails()) {
            return response()->json([
                "message" => "Invalid login credentials"
            ], 401);
        }
        ;

        $user = User::where("email", $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {

            return response()->json([
                "message" => "Invalid login credentials"
            ], 401);
        }
        $tokenObj = $user->createToken("access_token");
        $token =$tokenObj->plainTextToken;
        return response()->json([
            "message" => "Login Successful",
            "token" =>$token,
            "data" => [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "created_at" => $user->created_at,
                "updated_at" => $user->updated_at
            ]
        ], 200);
    }

    public function logout(Request $request)
    {

        $token = PersonalAccessToken::findToken($request->bearerToken());
        $token->delete();

        return response()->json([
            "message" => "Log out Successful"
        ], 200);

    }

    public function me()
    {
        $user = Auth::user();
        return response()->json([
            'data' => $user
        ]);
    }
}
;
