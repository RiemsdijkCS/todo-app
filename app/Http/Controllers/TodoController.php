<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Facade\FlareClient\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;


class TodoController extends Controller
{
    // Returns all todos in the database
    public function show()
    {
        return Todo::all();

        return response(200);
    }

    // Removes certain todo with id from database.
    public function remove(Request $request, $id)
    {
        $todo = Todo::query()->findOrFail($id);
        $todo->delete();

        return response()->json(204);
    }

    // Adds a todo to the database
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
            return response($validator->getMessageBag(), 400);
        }


        $todo = Todo::create([
            'title' => $request['title'],
            'description' => $request['description'],
            'completed' => $request['completed']
        ]);
        return response()->json($todo, 201);
    }

    // Toggles the completed boolean of an todo
    public function toggle(Request $request, $id)
    {
        $todo = Todo::query()->findOrFail($id);
        $todo->update([
            'completed' => !$todo->completed
        ]);

        return response(200);
    }

    // Updates a todo on the database and returns the updated todo in the body
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
            return response($validator->getMessageBag(), 400);
        }

        $todo = Todo::find($request['id']);
        $todo->update([
            'title' => $request['title'],
            'description' => $request['description']
        ]);

        return response()->json($todo, 200);
    }


    // Saves an image on the server. 
    public function saveImage(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'image' => 'Required'
            ]
        );
        if ($validator->fails()) {
            return response($validator->getMessageBag(), 400);
        }


        $extension = '.' . $request->file('image')->getClientOriginalExtension();
        Storage::disk('public')->put($id . $extension, file_get_contents($request->file('image')));

        return response(201);
    }
}
