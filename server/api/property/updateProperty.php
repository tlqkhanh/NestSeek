<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    session_start();
    if ($_SERVER['REQUEST_METHOD']=="POST")
    {
        require('../../config/database.php');
        require('../../ulti/validateUserInput.php');
        require('../../ulti/auth.php');
        require('../../models/property.model.php');
        if (isAuth('owner')){
            $data = json_decode(file_get_contents("php://input"));
            $errorMes = validateProperty($data);
            $property = Property::getPropertyById($conn,$data->propertyID);
            if ($property){
                $uid = $_SESSION["uid"];
                if($uid==$property->owner){
                    $newCurSlot = $data->initialSlot - ($property->initialSlot - $property->getCurSlot());
                    if ( $newCurSlot<0){
                        $errorMes = 'New total available slots can\'t be smaller than total of rented slot!!!';
                    }
                    if ($errorMes==''){
                        $property = new Property($conn,$data->propertyID,$data->name,null,$data->area,$data->location,$data->description,$data->imageURL,$data->price,null,$data->initialSlot,$newCurSlot);
                        $res = $property->updateProperty();
                        if ($res){
                            http_response_code(200);
                            $response = [
                                "success" => true,
                                "message" => 'Update property successfully!'
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
                    else{
                        http_response_code(400);
                        $response = [
                            "success" => false,
                            "message" => $errorMes,
                        ];
                    }
                }
                else{
                    http_response_code(401);
                    $response = [
                        "success" => false,
                        "message" => "Unauthorized action!",
                    ];
                }
            }
            else{
                http_response_code(404);
                $response = [
                    'success' => false,
                    'message' => 'Not found the resource',
                ];
            } 
        }
        else{
            http_response_code(401);
            $response = [
                "success" => false,
                "message" => "Unauthorized action!",
            ];
        }
        
        $conn->close();

        // Send CORS and JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    if ($_SERVER['REQUEST_METHOD']=="GET"){
        require('../../ulti/auth.php');
        require('../../config/database.php');
        require('../../models/property.model.php');
        if (isAuth('owner')){
            if (isset($_GET['pId'])){
                $pId =$_GET['pId'];
                $property = get_object_vars(Property::getPropertyById($conn,$pId));
                if ($property){
                    $uid = $_SESSION["uid"];
                    if($uid==$property['owner']){
                        http_response_code(200);
                        $response = [
                            'success' => true,
                            'message' => 'Get property detail successfully',
                            'property' => $property,
                        ];
                    }
                    else{
                        http_response_code(401);
                        $response = [
                            "success" => false,
                            "message" => "Unauthorized action!",
                        ];
                    }
                }
                else{
                    http_response_code(404);
                    $response = [
                        'success' => false,
                        'message' => 'Not found the resource',
                    ];
                }
            }
            else {
                http_response_code(400);
                $response = [
                    'success' => false,
                    'message' => 'Bad request',
                ];
            }
        }
        else{
            http_response_code(401);
            $response = [
                "success" => false,
                "message" => "Unauthorized action because not an owner!",
                "token" => $_SESSION['type']
            ];
        }
        $conn->close();

        // Send CORS and JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
    }

?>