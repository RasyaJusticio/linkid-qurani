<?php

namespace App\Models\Qurani;

use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    protected $connection = 'qurani';

    protected $casts = [
        'translated_name' => 'array'
    ];
}
