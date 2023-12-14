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
        $data = json_decode(file_get_contents("php://input"));
        $commentId = $data->commentID;
        $comment = new Comment($conn,$commentId);

        $res = $comment->deleteComment();
        if ($res){
            http_response_code(200);
            $response = [
                "success" => true,
                "message" => 'Delete comment successfully!'
            ];
        }
        else{
            http_response_code(500);
            $response = [
                "success" => false,
                "message" => 'Internal server error!'
            ];
        }
        $conn->close();

        // Send CORS and JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>