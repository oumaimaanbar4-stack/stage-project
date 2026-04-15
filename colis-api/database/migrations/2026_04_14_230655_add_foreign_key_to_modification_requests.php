<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('modification_requests', function (Blueprint $table) {
            $table->string('code_envoi')->change();

            $table->foreign('code_envoi')
                ->references('codeBordereau') 
                ->on('shipments')
                ->onDelete('cascade'); 
        });
    }

    public function down()
    {
        Schema::table('modification_requests', function (Blueprint $table) {
            $table->dropForeign(['code_envoi']);
        });
    }
};
