<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class uomController extends Controller
{
    public function index() {
        $data  = array(
            [
                "id" => 1,
                "name" => "SHP"
            ],
            [
                "id" => 2,
                "name" => "DIY"
            ],
            [
                "id" => 3,
                "name" => "ERD"
            ],
            [
                "id" => 4,
                "name" => "PRD"
            ],
        );
        return response()->json($data,200);
    }
}
