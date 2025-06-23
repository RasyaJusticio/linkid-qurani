<?php

namespace App\Models\LinkID;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $connection = "linkid";
    protected $table = 'users';
    protected $primaryKey = 'user_id';
}
