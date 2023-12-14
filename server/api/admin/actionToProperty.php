<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    session_start();

    if ($_SERVER['REQUEST_METHOD']=="POST")
    {
        require('../../config/database.php');
        require('../../models/property.model.php');
        require('../../ulti/auth.php');
        if (isAuth('admin')){
            $data = json_decode(file_get_contents("php://input"));
            $property = Property::getPropertyById($conn,$data->propertyID);
            $res = $property->changePropertyStatus($data->status);
            if ($res){
                http_response_code(200);
                $response = [
                    "success" => true,
                    "message" => "Property has been $data->status successfully!"
                ];
            }
            else{
                http_response_code(500);
                $response = [
                    "success" => false,
                    "message" => 'Internal server error!'
                ];
            }
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