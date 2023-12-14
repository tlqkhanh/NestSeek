<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    session_start();

    if ($_SERVER['REQUEST_METHOD']=="GET"){
        require('../../config/database.php');
        require('../../ulti/validateUserInput.php');
        require('../../models/user.model.php');     
        if (isset($_GET['userId']) || isset($_SESSION['uid'])){
            if (isset($_GET['userId'])) $userId = $_GET['userId'];
            else $userId = $_SESSION['uid'];
            $res = User::getUserById($userId,$conn);
            if ($res){
                if ($res['user_type']!='admin'){
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
                            'bankName' => $res['bank_name'],
                            'type' => $res['user_type'],
                            'status' => $res['status'],
                            'rating' => $avgRating,
                        ],
                    ];
                }
                else if ($res['user_type']=='admin' && isset($_SESSION['type']) && $_SESSION['type']=='admin')
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
                            'bankName' => $res['bank_name'],
                            'status' => $res['status'],
                            'type' => $res['user_type'],
                            'rating'=>0,
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
                    'message' => 'User is not found!',
                ];
            }    
        }
        else {
            http_response_code(404);
            $response = [
                'success' => false,
                'message' => 'User is not found!',
            ];
        }
        $conn->close();

        // Send CORS and JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>
