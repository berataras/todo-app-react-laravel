<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuthenticationTokensTable extends Migration
{
    public function up()
    {
        Schema::create('authentication_tokens', function (Blueprint $table) {
            $table->id();
            $table->integer('user');
            $table->text('token');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('authentication_tokens');
    }
}
