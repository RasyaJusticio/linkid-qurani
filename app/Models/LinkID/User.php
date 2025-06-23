<?php

namespace App\Models\LinkID;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $connection = "linkid";
    protected $table = 'users';
    protected $primaryKey = 'user_id';

    public function friends()
    {
        $friendIds = Friend::query()
            ->where(
                function ($query) {
                    $query->where(['user_one_id' => $this->user_id])
                        ->orWhere(['user_two_id' => $this->user_id]);
                }
            )
            ->where(['status' => true])
            ->get()
            ->map(
                function ($relation) {
                    return $relation->user_one_id === $this->user_id ? $relation->user_one_id : $relation->user_two_id;
                }
            );

        return User::whereIn('user_id', $friendIds);
    }


    public function groupMemberships()
    {
        return $this->hasMany(GroupMember::class, 'user_id', 'user_id');
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class, 'groups_members', 'user_id', 'group_id');
    }
}
