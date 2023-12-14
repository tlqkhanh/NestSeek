<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    session_start();
    if ($_SERVER['REQUEST_METHOD']=="GET")
    {
        require('../../config/database.php');
        require('../../ulti/auth.php');
        require('../../models/bill.model.php');
        if (isAuth('renter')){
            $billList = Bill::getAllBillsOfUser($conn,$_SESSION['uid']);
            http_response_code(200);
            $response = [
                'success' => true,
                'message' => 'Get bill list successfully',
                'billList' => $billList,
            ];
        }
        else{
            http_response_code(403);
            $response = [
                'success' => true,
                'message' => 'Forbidden',
            ];
        }
        
        $conn->close();

        // Send CORS and JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>