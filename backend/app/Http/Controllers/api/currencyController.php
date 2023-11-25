<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class currencyController extends Controller
{
    public function index() {
        $data  = array(
            [
                "id" => 1,
                "alias" => "USD",
                "name" => "United States Dollar",
            ],
            [
                "id" => 2,
                "alias" => "AED",
                "name" => "Dirham Uni Emirat Arab",
            ],
        );
        return response()->json($data,200);
    }
}
