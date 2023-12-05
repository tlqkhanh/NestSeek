<?php
    // session_set_cookie_params(['samesite' => 'None', 'secure'=>false]);
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    session_start();
    if ($_SERVER['REQUEST_METHOD']=="POST"){
        require('../../config/database.php');
        require('../../ulti/validateUserInput.php');
        require('../../models/user.model.php');
        $data = json_decode(file_get_contents("php://input"));

        $validateInput = validateUserLogIn($data);
        if ($validateInput == ''){
            $user = new User($conn,null,null,$data->email,$data->phoneNum,$data->password);
            $res = $user->validateUser();
            if ($res){
                
                $_SESSION['user_id'] = $res['userID'];
                $_SESSION['type'] = $res['user_type'];

                // Generate and set an HTTP-only cookie for the token
                $token = bin2hex(random_bytes(32)); // Example: Generate a random 64-character hex token
                $_SESSION['token'] = $token;
                //setcookie('authToken', $token, time() + 3600, '/', '', true, true); // HTTP-only cookie with a 1-hour expiration

                http_response_code(200);
                $response = [
                    'success' => true,
                    'message' => 'Login successful',
                    'user' => [
                        'uid' => $res['userID'],
                        'username' => $res['user_name'],
                        'type' => $res['user_type'],
                    ],
                    'token' => $token,
                    'ssid' => session_id(),
                ];
            }
            else{
                http_response_code(400);
                $response = [
                    'success' => false,
                    'message' => 'Invalid credentials',
                    'error' => 'User is not existed'
                ];
            }
        }
        else {
            http_response_code(400);
            $response = [
                'success' => false,
                'message' => 'Invalid input',
                'error' => $validateInput,
            ];
        }

        $conn->close();

        // Send CORS and JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>