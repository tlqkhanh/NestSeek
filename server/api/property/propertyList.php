<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");

    if ($_SERVER['REQUEST_METHOD']=="GET")
    {
        require('../../config/database.php');
        require('../../ulti/validateUserInput.php');
        require('../../models/property.model.php');
        $searchKeyWord = null;
        if (isset($_GET['search'])){
            $searchKeyWord = validateInput($_GET('search'));
        }
        $properties = Property::getAllProperty($conn,$searchKeyWord);
        http_response_code(200);
        $response = [
            'success' => true,
            'message' => 'Get properties list successfully',
            'propertyList' => $properties,
        ];
        $conn->close();

        // Send CORS and JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>