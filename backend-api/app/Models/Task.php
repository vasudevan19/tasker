<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'task',
        'is_completed',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'created_at' => 'date',
        'updated_at' => 'date'
    ];
}
