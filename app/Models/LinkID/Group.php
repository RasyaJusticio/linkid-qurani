<?php

namespace App\Models\LinkID;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Group extends Model
{
    protected $connection = 'linkid';
    protected $table = 'groups';
    protected $primaryKey = 'group_id';

    public function members(): HasMany
    {
        return $this->hasMany(GroupMember::class, 'group_id', 'group_id');
    }
}
