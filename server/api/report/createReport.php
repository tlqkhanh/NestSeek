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
        require('../../models/report.model.php');
        require('../../models/property.model.php');
        $data = json_decode(file_get_contents("php://input"));
        $content = validateInput($data->reason);
        if (empty($content)){
            http_response_code(400);
            $response = [
                "success" => false,
                "message" => 'Reason of report is required!'
            ];
        }
        else{
            $report = new Report($conn,null,$data->type,$data->reportedID,$data->userID,null,$content);
            $res = $report->createReport();
            if ($res){
                http_response_code(200);
                $response = [
                    "success" => true,
                    "message" => 'Report has been sent!'
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
        $conn->close();
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>