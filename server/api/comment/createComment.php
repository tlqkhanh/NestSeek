<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");

    if ($_SERVER['REQUEST_METHOD']=="POST")
    {
        require('../../ulti/validateUserInput.php');
        require('../../config/database.php');
        require('../../models/comment.model.php');
        require('../../models/rent.model.php');
        require('../../models/property.model.php');
        $data = json_decode(file_get_contents("php://input"));
        $property = Property::getPropertyById($conn,$data->propertyID);
        $numOfRent = Rent::haveUserRented($conn,$data->userID,$data->propertyID);

        if (is_int($numOfRent)){
            if ($numOfRent>0 || $property->owner == $data->userID){
                $content = validateInput($data->comment);
                if (empty($content)){
                    http_response_code(400);
                    $response = [
                        "success" => false,
                        "message" => 'Content of comment is required!'
                    ];
                }
                else{
                    $isChild = $data->parentID!=0 ? 'yes' : 'no';
                    $parentID = $data->parentID!=0 ? $data->parentID : null;
                    $comment = new Comment($conn, null, $content, null, $data->userID, $data->propertyID, $isChild, $parentID);
                    $res = $comment->createComment();
                    if ($res){
                        http_response_code(200);
                        $response = [
                            "success" => true,
                            "message" => 'Create comment successfully!'
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
            }
            else{
                http_response_code(400);
                $response = [
                    "success" => false,
                    "message" => 'Only users having rented this place or its ownner can comment on it!'
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