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

        $validateInput = validateUserSignIn($data);
        if ($validateInput == ''){
            $user = new User($conn,null,$data->userName,$data->email,$data->phoneNum,$data->password,$data->type,$data->fullName,$data->bankNum,$data->bankName);
            $res = $user->haveUserExisted();
            if (!$res){
                $user->createUser();
                http_response_code(200);
                $response = [
                    'success' => true,
                    'message' => 'Signup successful'
                ];
            }
            else{
                http_response_code(400);
                $response = [
                    'success' => false,
                    'message' => 'User has already existed!',
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
        // Close the database connection
        $conn->close();

        // Send CORS and JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>