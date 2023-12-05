<?php
    session_set_cookie_params(['samesite' => 'None', 'secure'=>false]);
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");

    if ($_SERVER['REQUEST_METHOD']=="GET")
    {
        require('../../config/database.php');
        require('../../ulti/validateUserInput.php');
        require('../../models/user.model.php'); 
        require('../../models/property.model.php');
        require('../../models/rating.model.php');

        if (isset($_GET['pId'])){
            $pId =$_GET['pId'];
            $property = Property::getPropertyById($conn,$pId);
            if ($property){
                $rating = Rating::getAvgRatingOfProperty($conn,$pId);
                $owner = User::getUserById($property['ownerID'],$conn);
                $property['rating'] = $rating;
                $property['ownerName'] = $owner['user_name'];
                http_response_code(200);
                $response = [
                    'success' => true,
                    'message' => 'Get property detail successfully',
                    'property' => $property,
                ];
            }
            else{
                http_response_code(404);
                $response = [
                    'success' => false,
                    'message' => 'Not found the resource',
                ];
            }
        }
        else {
            http_response_code(400);
            $response = [
                'success' => false,
                'message' => 'Bad request',
            ];
        }
        $conn->close();

        // Send CORS and JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>