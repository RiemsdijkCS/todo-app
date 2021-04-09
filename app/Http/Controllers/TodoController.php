<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Facade\FlareClient\Http\Response;

class TodoController extends Controller
{
    public function show()
    {
        return Todo::all();
    }

    public function remove(Request $request, $id)
    {
        $todo = Todo::find($id);
        $todo->delete();

        return Response()->json(204);
    }

    public function add(Request $request)
    {
        $title = $request->input('title');
        $desc = $request->input('description');
        $completed = $request->boolean('completed');
        $todo = Todo::create([
            'title' => $title,
            'description' => $desc,
            'completed' => $completed
        ]);
        return response()->json($todo, 201);
    }

    public function update(Request $request, $id)
    {

        $todo = Todo::find($id);
        $todo->update([
            'completed' => !$todo->completed
        ]);
    }
}
