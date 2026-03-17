<?php

namespace Database\Seeders;

use App\Models\User;
use Date;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([
            'name'=>'admin',
            'email'=>"admin@example.com",
            'password'=>Hash::make('admin'),
            'created_at'=>Date::now(),
            'updated_at'=>Date::now()
        ]);
    }
}
