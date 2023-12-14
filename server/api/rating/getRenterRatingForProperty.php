<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");

    if ($_SERVER['REQUEST_METHOD']=="GET")
    {
        require('../../config/database.php');
        require('../../models/rating.model.php');
        require('../../models/rent.model.php');
        $userID = $propertyID = 0;
        if (isset($_GET['userID'])) $userID = $_GET['userID'];
        if (isset($_GET['propertyID'])) $propertyID = $_GET['propertyID'];
        $numOfRent = Rent::haveUserRented($conn,$userID,$propertyID);
        if (is_int($numOfRent)){
            if ($numOfRent>0){
                $rating = Rating::getRatingOfUserForProperty($conn,$userID,$propertyID);
                $star = 0;
                if ($rating){
                    $star = $rating->rate;
                }
                http_response_code(200);
                $response = [
                    "success" => true,
                    "message" => 'Get user\'s rating for property successfully!',
                    "rating" => $star,
                ];
            }
            else{
                http_response_code(200);
                $response = [
                    "success" => true,
                    "message" => 'Get user\' rating for property successfully!',
                    "rating" => 0,
                ];
            }
        }
        else{
            http_response_code(500);
                $response = [
                    "success" => false,
                    "message" => 'Internal server error: '.$numOfRent,
                ];
        }
        $conn->close();

        // Send CORS and JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>