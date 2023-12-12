<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");

    if ($_SERVER['REQUEST_METHOD']=="POST")
    {
        require('../../config/database.php');
        require('../../models/rating.model.php');
        require('../../models/rent.model.php');

        $data = json_decode(file_get_contents("php://input"));
        $numOfRent = Rent::haveUserRented($conn,$data->userID,$data->propertyID);
        if (is_int($numOfRent)){
            if ($numOfRent>0){
                $rating = Rating::getRatingOfUserForProperty($conn,$data->userID,$data->propertyID);
                if (!$rating){
                    $rating = new Rating($conn, null, $data->rate, $data->userID, $data->propertyID);
                    $res = $rating->createRating();
                }
                else{
                    $rating->rate = $data->rate;
                    $res = $rating->updateRating();
                }
                if ($res){
                    http_response_code(200);
                    $response = [
                        $success => true,
                        $message => 'Rate property successfully!'
                    ];
                }
                else{
                    http_response_code(500);
                    $response = [
                        $success => false,
                        $message => 'Internal server error!'
                    ];
                }
            }
            else{
                http_response_code(400);
                $response = [
                    $success => false,
                    $message => 'User must rent this place before rating it!'
                ];
            }
        }
        else{
            http_response_code(500);
                $response = [
                    $success => false,
                    $message => 'Internal server error: '.$numOfRent,
                ];
        }
        $conn->close();

        // Send CORS and JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>