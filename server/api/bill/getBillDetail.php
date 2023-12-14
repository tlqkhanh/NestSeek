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
            if (isset($_GET['billId'])){
                $billId = $_GET['billId'];
                $bill = Bill::getBillById($conn,$billId);
                if ($bill){
                    http_response_code(200);
                    $response = [
                        'success' => true,
                        'message' => 'Get bill successfully',
                        'bill' => $bill,
                    ];
                }
                else {
                    http_response_code(404);
                    $response = [
                        'success' => false,
                        'message' => 'This bill is not existed for this user',
                    ];
                }
            }
            else{
                http_response_code(400);
                $response = [
                    'success' => false,
                    'message' => 'Bad request',
                ];
            }
        }
        else{
            http_response_code(401);
            $response = [
                'success' => true,
                'message' => 'Unauthorized action',
            ];
        }
        
        $conn->close();

        // Send CORS and JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>