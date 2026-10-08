<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
  
  public function index()
  {
    return response()->json(User::all());
  }

  
  public function store(Request $request)
  {
    $request->validate([
      'name'     => 'required|string|max:255',
      'email'    => 'required|email|unique:users,email',
      'password' => 'required|string|min:6',
      'role'     => 'required|in:admin,manager,user,livreur',
    ]);

    $user = User::create([
      'name'     => $request->input('name'),
      'email'    => $request->input('email'),
      'password' => Hash::make($request->input('password')),
      'role'     => $request->input('role'),
    ]);

    return response()->json($user, 201);
  }


  public function update(Request $request, $id)
  {
    $user = User::findOrFail($id);

    $user->name  = $request->input('name', $user->name);
    $user->email = $request->input('email', $user->email);
    $user->role  = $request->input('role', $user->role);

    if ($request->filled('password')) {
      $user->password = Hash::make($request->input('password'));
    }

    $user->save();

    return response()->json($user);
  }

  
  public function destroy($id)
  {
    $user = User::findOrFail($id);
    $user->delete();

    return response()->json(['message' => 'Utilisateur archivé.']);
  }
}
