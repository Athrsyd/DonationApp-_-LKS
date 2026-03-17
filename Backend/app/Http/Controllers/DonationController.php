<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DonationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $donaions = Donation::all();

        if (!$donaions) {
            return response()->json([
                "message" => "Server error occurred",
            ], 500);
        }
        return response()->json([
            "message" => "Retrieve all donations success",
            "data" => $donaions
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            "name" => "string|required",
            "email" => "email|required",
            "amount" => "required"
        ]);

        if ($validate->fails()) {
            return response()->json([
                "message" => "Validation Error",
                "error" => $validate->errors()
            ], 422);
        }

        $data = Donation::create($request->all());
        return response()->json([
            "message" => "Donation created successfully",
            "data" => [
                "id" => $data->id,
                "name" => $data->name,
                "email"=>$data->email,
                "amount"=>$data->amount,
                "created_at"=>$data->created_at,
                "updated_at"=>$data->updated_at
            ]
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Donation::where('id', $id)->first();

        if (!$data) {
            return response()->json([
                "message" => "Donation not found",
            ], 404);
        }
        return response()->json([
            "message" => "Retrieve all donations success",
            "data" => $data
        ], 200);
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Donation $donation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Donation $donation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data=Donation::where('id',$id)->first();
        if (!$data) {
            return response()->json([
                "message" => "Donation not found",
            ], 422  );
        }

        $data->delete();
        return response()->json([
            "message" => "Donation deleted successfully",
        ]);
        
    }
}
