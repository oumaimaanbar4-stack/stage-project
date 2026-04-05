<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Shipment extends Model
{
    protected $table = 'shipments';
    protected $primaryKey = 'idBordereau';
    public $incrementing = true;

    protected $fillable = [
        'client_id',      //  The foreign key
        'codeBordereau',
        'dateDepot',
        'libelle',
        'dernierStatut',
        'dateLastStatus',
        'datePaiement',
        'nomDest',        
        'telDest',
        'adresseDest',
        'libville',
        'amountCrbt'
    ];

    protected $casts = [
        'dateDepot' => 'datetime',
        'dateLastStatus' => 'datetime',
        'datePaiement' => 'datetime',
        'amountCrbt' => 'float'
    ];


    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'client_id');
    }
}
