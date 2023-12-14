<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");

    if ($_SERVER['REQUEST_METHOD']=="POST")
    {
        require('../../config/database.php');
        require('../../models/bill.model.php');
        
        $data = json_decode(file_get_contents("php://input"));
        $bill = new Bill($conn,$data->billId);
        $res = $bill->payBill();
        if ($res){
            http_response_code(200);
            $response = [
                'success' => true,
                'message' => 'Bill is paid!'
            ];
        }
        else{
            http_response_code(500);
            $response = [
                'success' => false,
                'message' => 'Server internal error!' 
            ];
        }
        $conn->close();
        // Send CORS and JSON response
        header('Content-Type: application/json');
        echo json_encode($response);

    }
?>