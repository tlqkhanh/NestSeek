<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    if ($_SERVER['REQUEST_METHOD']=="POST"){
        require('../../config/database.php');
        require('../../ulti/validateUserInput.php');
        require('../../models/user.model.php');
        $data = json_decode(file_get_contents("php://input"));
        if (isset($_SESSION['user_id']) && isset($_SESSION['token']) && $_SESSION['user_id']==$data->userId){

            $validateInput = validateUserEditProfile($data);
            if ($validateInput == ''){
                $user = new User($conn,$data->userId,$data->userName,$data->email,$data->phoneNum,null,$data->type,$data->fullName,$data->bankNum,$data->bankName);
                $res = $user->haveUserExisted();
                if ($res){
                    $user->updateUserInfo();
                    http_response_code(200);
                    $response = [
                        'success' => true,
                        'message' => 'User\'s profile updates successfully!'
                    ];
                }
                else{
                    http_response_code(400);
                    $response = [
                        'success' => false,
                        'message' => 'User has not existed yet!',
                    ];
                }
            }
            else {
                http_response_code(400);
                $response = [
                    'success' => false,
                    'message' => $validateInput,
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
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>