<?php

namespace App\Models\LinkID;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GroupMember extends Model
{
    protected $connection = 'linkid';
    protected $table = 'groups_members';

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class, 'group_id', 'group_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
