<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    session_start();
    if ($_SERVER['REQUEST_METHOD']=="POST"){
        $isAuth = false;
        if (isset($_SESSION['token']) && isset($_SESSION['type'])){
            $authorizationHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
            if (preg_match('/Bearer\s+(.+)/', $authorizationHeader, $matches)) {
                $token = $matches[1];
                if ($_SESSION['token']==$token && $_SESSION['type']=='admin') $isAuth = true;
            }
        }

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
                'message' => 'User is authorized!',
            ];
        }
        http_response_code(403);
        return $response = [
            'success' => false,
            'error' => 'User is unauthorized!',
        ];
    }
?>