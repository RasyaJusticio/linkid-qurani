<?php

namespace App\Models\LinkID;

use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    protected $connection = 'linkid';

    public function userOne()
    {
        return $this->belongsTo(User::class, 'user_one_id', 'user_id');
    }

    public function userTwo()
    {
        return $this->belongsTo(User::class, 'user_two_id', 'user_id');
    }
}
