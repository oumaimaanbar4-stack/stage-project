<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{

    public function index()
    {
        return response()->json(Client::all());
    }


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
    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        $client->delete();
        return response()->json(['message' => 'Client archivé']);
    }
    public function archived()
    {
        $clients = Client::onlyTrashed()->with('shipments')->get();
        return response()->json($clients);
    }
    public function restore($id)
    {
        $client = Client::onlyTrashed()->findOrFail($id);
        $client->restore();
        return response()->json(['message' => 'Client restauré']);
    }
}
