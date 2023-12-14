<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    session_start();

    // Check if the user is logged in
    if ($_SERVER['REQUEST_METHOD']=="POST"){
        if (isset($_SESSION['user_id']) && isset($_SESSION['token'])) {
            // Destroy the session
            session_destroy();
            $_SESSION = [];
    
            // Return a success response
            $response = [
                'success' => true,
                'message' => 'Logout successful',
            ];
            http_response_code(200);
        } else {
            // Return an error response if the user is not logged in
            $response = [
                'success' => false,
                'message' => 'User is not logged in',
            ];
            http_response_code(401); // Unauthorized
        }
    
        // Send JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>
