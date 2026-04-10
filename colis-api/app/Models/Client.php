<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Client extends Model
{
    // Important: Change primary key to 'id' if you used $table->id() in migration
    protected $primaryKey = 'id';

    protected $fillable = [
        'nom',
        'telephone',
        'adresse'
    ];

    // The Relationship: One Client has Many Shipments
    public function shipments(): HasMany
    {
        return $this->hasMany(Shipment::class, 'client_id');
    }
  
}
