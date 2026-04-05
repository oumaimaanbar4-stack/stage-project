<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    // To show the list in your React dropdown/select
    public function index()
    {
        return response()->json(Client::all());
    }

    // To add a new sender to the database
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom'       => 'required|string',
            'telephone' => 'required|string|unique:clients,telephone',
            'adresse'   => 'required|string',
        ]);

        $client = Client::create($validated);

        return response()->json([
            'message' => 'Client (Expéditeur) créé avec succès !',
            'data' => $client
        ], 201);
    }
    public function show($id)
    {
        $client = Client::find($id);
        if (!$client) {
            return response()->json(['message' => 'Client non trouvé'], 404);
        }
        return response()->json($client);
    }

    public function getBordereaux($id)
    {
        $shipments = \App\Models\Shipment::where('client_id', $id)->get();
        return response()->json($shipments);
    }
}