<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Facade\FlareClient\Http\Response;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    public function show()
    {
        return Todo::all();

        return Response(200);
    }

    public function remove(Request $request, $id)
    {
        $todo = Todo::find($id);
        $todo->delete();

        return Response()->json(204);
    }

    public function add(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'title' => 'Required|String|Min:2|Max:255',
                'description' => 'Required|String|Min:2|Max:255',
                'completed' => 'boolean'
            ]
        );

        if ($validator->fails()) {
            return Response($validator->getMessageBag(), 400);
        }


        $todo = Todo::create([
            'title' => $request['title'],
            'description' => $request['description'],
            'completed' => $request['completed']
        ]);
        return Response()->json($todo, 201);
    }

    public function toggle(Request $request, $id)
    {
        $todo = Todo::find($id);
        $todo->update([
            'completed' => !$todo->completed
        ]);

        return Response(200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'id' => 'Required|Integer',
                'title' => 'Required|String|Min:2|Max:255',
                'description' => 'Required|String|Min:2|Max:255',

            ]
        );
        if ($validator->fails()) {
            return Response($validator->getMessageBag(), 400);
        }

        $todo = Todo::find($request['id']);
        $todo->update([
            'title' => $request['title'],
            'description' => $request['description']
        ]);

        return Response()->json($todo, 200);
    }
}
