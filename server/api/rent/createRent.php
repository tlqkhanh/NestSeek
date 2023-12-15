<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");

    if ($_SERVER['REQUEST_METHOD']=="POST")
    {
        require('../../config/database.php');
        require('../../models/property.model.php');
        require('../../models/rent.model.php');
        
        $data = json_decode(file_get_contents("php://input"));


        $property = Property::getPropertyById($conn,$data->propertyID);
        $curSlot = $property->getCurSlot();
        if ($curSlot <=0 ){
            http_response_code(400);
            $response = [
                'success' => false,
                'message' => 'There is no available slot for this property!' 
            ];
        }
        else{
            $property->updateCurSlot($curSlot-1);
            $rent = new Rent($conn,null,$data->userID,$data->propertyID,date('Y-m-d'),$data->period);
            $newRenID = $rent->createRent();
            $rent->rentID = $newRenID;
            $rent->updateRentStatus('waiting');
            http_response_code(200);
            $response = [
                'success' => true,
                'message' => 'Register for rent successfully!'
            ];

        }
        $conn->close();
        // Send CORS and JSON response
        header('Content-Type: application/json');
        echo json_encode($response);

    }
?>