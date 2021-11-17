<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        $user = new User();
        $user->username = 'admin';
        $user->password = bcrypt('1212');
        $user->is_admin = 1;
        $user->save();

        $user = new User();
        $user->username = 'berat';
        $user->password = bcrypt('1212');
        $user->is_admin = 0;
        $user->save();

        $user = new User();
        $user->username = 'ozan';
        $user->password = bcrypt('1212');
        $user->is_admin = 0;
        $user->save();
    }
}
