<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    // These are the fields that can be accessed/filled.
    protected $fillable = [
        'title',
        'description',
        'completed'
    ];

    // Cast completed to a boolean for nice type conversion for the front-end
    protected $casts = [
        'completed' => 'boolean',
    ];
}
