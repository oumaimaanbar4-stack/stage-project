<?php

namespace App\Http\Controllers;

use App\Models\ModificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ModificationRequestController extends Controller
{
    public function index()
    {
        return response()->json(ModificationRequest::latest()->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'code_envoi'     => 'required|string',
            'champ'          => 'required|string',
            'ancienne_valeur' => 'nullable|string',
            'nouvelle_valeur' => 'required|string',
            'status'         => 'nullable|string',
            'justification' => 'nullable|string',
        ]);

        $modif = ModificationRequest::create($data);
        return response()->json($modif, 201);
    }
    public function update(Request $request, $id)
    {
        $modif = ModificationRequest::findOrFail($id);
        $newStatus = $request->input('status'); // 'Accepté' or 'Refusé'

        $modif->status = $newStatus;
        $modif->save();

        if ($newStatus === 'Accepté') {
            $fieldMap = [
                'Nom Destinataire'       => 'nomDest',
                'Téléphone Destinataire' => 'telDest',
                'Ville / Destination'    => 'libville',
                'Montant CRBT'           => 'amountCrbt',
                'Commentaire'            => 'commentaire',
                'Adresse Destinataire' => 'adresseDest',
            ];

            $column = $fieldMap[$modif->champ] ?? null;
            if ($column) {
                DB::table('shipments')
                    ->where('codeBordereau', $modif->code_envoi)
                    ->update([$column => $modif->nouvelle_valeur]);
            }
        }

        return response()->json($modif);
    }
}
