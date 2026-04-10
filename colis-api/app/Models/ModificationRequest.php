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
        'status',
    ];
}
