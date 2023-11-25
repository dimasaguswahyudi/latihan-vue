<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class chargeController extends Controller
{
    public function index() {
        $data  = array(
            [
                "id" => 1,
                "name" => "Lorem Ipsum",
            ],
            [
                "id" => 2,
                "name" => "Dolor Allow",
            ],
            [
                "id" => 3,
                "name" => "Simply Dummy",
            ],
        );
        return response()->json($data,200);
    }
}
