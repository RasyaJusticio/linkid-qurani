<?php

namespace App\Http\Controllers\Qurani;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RedirectController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        return Inertia::render(
            'redirect', [
            'linkIdLogo' => asset('storage/assets/images/linkid-logo-fullcolor.png'),
            ]
        );
    }
}
