<?php

namespace App\Models\Qurani;

use Illuminate\Database\Eloquent\Model;

class Juz extends Model
{
    protected $connection = 'qurani';

    protected $casts = [
        'pages' => 'array',
        'verse_mapping' => 'array'
    ];
}
