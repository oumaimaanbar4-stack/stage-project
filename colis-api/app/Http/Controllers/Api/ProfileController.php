<?php

namespace App\Http\Controllers\Api; 
use App\Http\Controllers\Controller;
use App\Models\Shipment;
use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function getStats(Request $request)
    {
        return response()->json([
            'shipments_count' => Shipment::count(),
            'clients_count' => Client::count(),
            'users_count' => User::count(),
        ]);
    }
}
