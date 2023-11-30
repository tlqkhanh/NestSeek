<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    session_start();

    if ($_SERVER['REQUEST_METHOD']=="POST"){
        require('../../config/database.php');
        require('../../ulti/validateUserInput.php');
        require('../../models/user.model.php');     
        if (isset($_SESSION['user_id']) && isset($_SESSION['token'])){
            $data = json_decode(file_get_contents("php://input"));
            $user = User::getUserById($data->userId,$conn);
            if ($user){
                if ($user['user_type']!='admin'){
                    require('../../models/rating.model.php');
                    $avgRating = Rating::getAvgRatingOfOwner($conn,$res['userID']);
                    http_response_code(200);
                    $response = [
                        'success' => true,
                        'message' => 'Load profile succesfully',
                        'user' => [
                            'id' => $res['userID'],
                            'username' => $res['user_name'],
                            'email' => $res['email'],
                            'fullName' => $res['full_name'],
                            'phoneNum' => $res['phone_number'],
                            'bankNum' => $res['bank_number'],
                            'bank_name' => $res['bankNum'],
                            'type' => $res['user_type'],
                            'rating' => $avgRating,
                        ],
                    ];
                }
                else if ($user['user_type']=='admin' && isset($_SESSION['type']) && $_SESSION['type']=='admin')
                {
                    http_response_code(200);
                    $response = [
                        'success' => true,
                        'message' => 'Load profile succesfully',
                        'user' => [
                            'id' => $res['userID'],
                            'username' => $res['user_name'],
                            'email' => $res['email'],
                            'fullName' => $res['full_name'],
                            'phoneNum' => $res['phone_number'],
                            'bankNum' => $res['bank_number'],
                            'bank_name' => $res['bankNum'],
                            'type' => $res['user_type'],
                        ],
                    ];
                }
                else {
                    http_response_code(403); // Unauthorized
                    $response = [
                        'success' => false,
                        'message' => 'User is unauthorized!',
                    ];
                }
            }
            else {
                http_response_code(404);
                $response = [
                    'success' => false,
                    'message' => 'User not found!',
                ];
            }    
        }
        else {
            http_response_code(401);
            $response = [
                'success' => false,
                'message' => 'User is unauthenticated!',
            ];
        }
        $conn->close();

        // Send CORS and JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>
