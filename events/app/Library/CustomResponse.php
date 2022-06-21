<?php

namespace App\Library;

use stdClass;


class CustomResponse {

    public static function content($decs, $msg, $data)
    {
        $res = new stdClass();
        
        $res->description = $decs;
        $res->response_code = config('constants.response_code')[$decs];

        if(isset($msg)){
            $res->msg = $msg;
        }
        if(isset($data)){
            $res->response = $data;
        }
        
        return response()->json($res);
    }
}