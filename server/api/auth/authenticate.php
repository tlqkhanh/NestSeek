<?php
    //session_set_cookie_params(['samesite' => 'None', 'secure'=>false]);
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    session_start();
    if ($_SERVER['REQUEST_METHOD']=="POST"){
        $isAuth = false;
        if (isset($_SESSION['token']) && isset($_COOKIE['token'])){
            if ($_SESSION['token']==$_COOKIE['token']){
                $isAuth = true;
                $token = $_COOKIE['token'];
            }
        }

        // Send CORS and JSON response
        header('Content-Type: application/json');
        echo json_encode(setReponse($isAuth));
    }

    function setReponse($isAuth){
        if ($isAuth){
            http_response_code(200);
            return $response = [
                'success' => true,
                'message' => 'User is authenticated!',
            ];
        }
        http_response_code(400);
        return $response = [
            'success' => false,
            'error' => 'User is unauthenticated!',
            'session_id' => session_id(),
        ];
    }
?>