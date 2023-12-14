<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");

    if ($_SERVER['REQUEST_METHOD']=="GET")
    {
        require('../../config/database.php');
        require('../../ulti/validateUserInput.php');
        require('../../models/comment.model.php');
        if (isset($_GET['parentID'])){
            $parentID = $_GET['parentID'];
            $commentList = Comment::getAllChildrenComment($conn,$parentID);
            http_response_code(200);
            $response = [
                'success' => true,
                'message' => 'Get child comment list successfully',
                'commentList' => $commentList,
            ];
        }
        else{
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