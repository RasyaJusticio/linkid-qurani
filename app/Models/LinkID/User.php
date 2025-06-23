<?php

namespace App\Models\LinkID;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $connection = "linkid";
    protected $table = 'users';
    protected $primaryKey = 'user_id';


    public function groupMemberships()
    {
        return $this->hasMany(GroupMember::class, 'user_id', 'user_id');
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class, 'groups_members', 'user_id', 'group_id');
    }
}
