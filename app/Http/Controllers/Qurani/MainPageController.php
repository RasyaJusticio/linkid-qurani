<?php

namespace App\Http\Controllers\Qurani;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MainPageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = Auth::user();

        $groups = $user->groups->map(
            function ($group) {
                return [
                'group_id' => $group->group_id,
                'group_name' => $group->group_name,
                'group_title' => $group->group_title,
                ];
            }
        );

        $friends = $user->friends()->get()->map(function ($friend) {
            return [
                'user_id' => $friend->user_id,
                'user_name' => $friend->user_name,
                'user_firstname' => $friend->user_firstname,
                'user_lastname' => $friend->user_lastname,
            ];
        });

        return Inertia::render(
            'main-page',
            [
            'groups' => $groups,
            'friends' => $friends
            ]
        );
    }
}
