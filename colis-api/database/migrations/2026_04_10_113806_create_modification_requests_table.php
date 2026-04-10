<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('modification_requests', function (Blueprint $table) {
            $table->id();
            $table->string('code_envoi');
            $table->string('champ');
            $table->text('ancienne_valeur')->nullable();
            $table->text('nouvelle_valeur');
            $table->string('status')->default('En attente');
            $table->string('certif')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modification_requests');
    }
};
