<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModificationRequest extends Model
{
    protected $fillable = [
        'code_envoi',
        'champ',
        'ancienne_valeur',
        'nouvelle_valeur',
        'justification',
        'status',
    ];
    public function shipment()
    {
        return $this->belongsTo(Shipment::class, 'code_envoi', 'codeBordereau');
    }
}
