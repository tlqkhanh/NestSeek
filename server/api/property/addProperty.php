<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    session_start();
    if ($_SERVER['REQUEST_METHOD']=="POST")
    {
        require('../../config/database.php');
        require('../../ulti/validateUserInput.php');
        require('../../ulti/auth.php');
        require('../../models/property.model.php');

        if (isAuth('owner')){
            $data = json_decode(file_get_contents("php://input"));
            $errorMes = validateProperty($data);
            if ($errorMes==''){
                $ownerID = $_SESSION['uid'];
                $property = new Property($conn,null,$data->name,$ownerID,$data->area,$data->location,$data->description,$data->imageURL,$data->price,null,$data->initialSlot,$data->initialSlot);
                $res = $property->createProperty();
                if ($res){
                    http_response_code(200);
                    $response = [
                        "success" => true,
                        "message" => 'Create property successfully!'
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
                http_response_code(400);
                $response = [
                    "success" => false,
                    "message" => $errorMes,
                ];
            }
        }
        else {
            http_response_code(401);
            $response = [
                "success" => false,
                "message" => "Only logined owner can upload property",
            ];
        }
        $conn->close();

        // Send CORS and JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>