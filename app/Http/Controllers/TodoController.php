<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Facade\FlareClient\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;


class TodoController extends Controller
{
    public function show()
    {
        return Todo::all();

        return response(200);
    }

    public function remove(Request $request, $id)
    {
        $todo = Todo::find($id);
        $todo->delete();

        return response()->json(204);
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
            return response($validator->getMessageBag(), 400);
        }


        $todo = Todo::create([
            'title' => $request['title'],
            'description' => $request['description'],
            'completed' => $request['completed']
        ]);
        return response()->json($todo, 201);
    }

    public function toggle(Request $request, $id)
    {
        $todo = Todo::find($id);
        $todo->update([
            'completed' => !$todo->completed
        ]);

        return response(200);
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
            return response($validator->getMessageBag(), 400);
        }

        $todo = Todo::find($request['id']);
        $todo->update([
            'title' => $request['title'],
            'description' => $request['description']
        ]);

        return response()->json($todo, 200);
    }

    public function saveImage(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'image' => 'Required|mimes:jpeg,jpg,png,gif'
            ]
        );
        if ($validator->fails()) {
            return response($validator->getMessageBag(), 400);
        }

        if ($request->hasFile('image')) {
            $extension = $request->file('image')->getClientOriginalExtension();

            $name = $id . '.' . $extension;
            error_log($name);
            Storage::disk('public')->put($name, $request->file('image'));
            return response(201);
        }
    }
}
