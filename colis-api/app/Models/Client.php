<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'id';

    protected $fillable = [
        'nom',
        'telephone',
        'adresse'
    ];

    public function shipments(): HasMany
    {
        return $this->hasMany(Shipment::class, 'client_id');
    }
}
