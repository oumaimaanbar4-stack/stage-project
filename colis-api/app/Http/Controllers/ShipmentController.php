<?php

namespace App\Http\Controllers;

use App\Models\Shipment;
use Illuminate\Http\Request;

class ShipmentController extends Controller
{
    public function index()
    {
        return response()->json(Shipment::with('client')->get());
    }

    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id'     => 'required|exists:clients,id', 
            'codeBordereau' => 'required|string|unique:shipments,codeBordereau',
            'libville'      => 'required|string',
            'amountCrbt'    => 'required|numeric',
            'nomDest'       => 'required|string',
            'telDest'       => 'required|string',
            'adresseDest'   => 'required|string',
        ]);

        // Default values for a new shipment
        $validated['libville'] = strtoupper($request->libville);
        $validated['dernierStatut'] = 'enc';
        $validated['libelle']       = 'En cours';
        $validated['dateDepot']     = now();

        $shipment = Shipment::create($validated);

        return response()->json([
            'message' => 'Envoi créé et lié au client !',
            'data' => $shipment
        ], 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $shipment = Shipment::where('idBordereau', $id)->firstOrFail();

        $shipment->update([
            'dernierStatut' => $request->status,
            'libelle'       => $request->label,
            'dateLastStatus' => now(),
            'datePaiement'  => ($request->status === 'liv') ? now() : $shipment->datePaiement
        ]);

        return response()->json(['message' => 'Statut mis à jour']);
    }
}