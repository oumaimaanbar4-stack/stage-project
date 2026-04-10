<?php

namespace App\Http\Controllers;

use App\Models\ModificationRequest;
use Illuminate\Http\Request;

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
        ]);

        $modif = ModificationRequest::create($data);
        return response()->json($modif, 201);
    }
}
