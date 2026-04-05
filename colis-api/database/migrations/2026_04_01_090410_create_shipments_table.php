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
        Schema::create('shipments', function (Blueprint $table) {
            $table->id('idBordereau');
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade'); // The Link
            $table->string('codeBordereau')->unique();
            $table->string('libville');
            $table->string('libelle');
            $table->string('dernierStatut');
            $table->decimal('amountCrbt', 10, 2);
            $table->string('nomDest');
            $table->string('telDest');
            $table->text('adresseDest');
            $table->timestamp('dateDepot')->nullable();
            $table->timestamp('dateLastStatus')->nullable();
            $table->timestamp('datePaiement')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
