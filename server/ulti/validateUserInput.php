<?php
    function validateInput($data) {
        if (!$data) return $data;
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    function validateUserSignIn($data){
        $errorMes = '';
        $userName = validateInput($data->userName);
        $email = validateInput($data->email); 
        $password = $data->password;
        $phoneNum = validateInput($data->phoneNum);
        $type = validateInput($data->type);
        $fullName = validateInput($data->fullName);

        if (empty($userName) || strlen($userName)>255) {
            $errorMes = 'Username is required and must be less than 255 characters.';
        }
        else if (empty($email) || strlen($email)>255 || !preg_match("/^[a-zA-z0-9]+@[a-zA-z0-9]+\.[a-zA-z0-9]+$/",$email)) {
            $errorMes = 'Email is required and must be a valid email address with less than 255 characters.';
        }
        else if (empty($password) || strlen($password) < 8 || strlen($password) > 30) {
            $errorMes = "Password is required and should be 8-30 characters long.";
        }
        else if (empty($fullName) || strlen($fullName)>255) {
            $errorMes = 'Full Name is required and must be less than 255 characters.';
        }
        else if (empty($phoneNum) || !preg_match('/^\d{10}$/', $phoneNum)) {
            $errorMes = 'Phone number is required and must be 10 digits.';
        }
        else if (empty($type) || !in_array($type, ['renter', 'owner'])) {
            $errorMes = 'Type is required and must be "renter" or "owner".';
        }
        return $errorMes;
    }

    function validateUserEditProfile($data){
        $errorMes = '';
        $userName = validateInput($data->username);
        $email = validateInput($data->email);
        $phoneNum = validateInput($data->phoneNum);
        $fullName = validateInput($data->fullName);

        if (empty($userName) || strlen($userName)>255) {
            $errorMes = 'Username is required and must be less than 255 characters.';
        }
        else if (empty($email) || strlen($email)>255 || !preg_match("/^[a-zA-z0-9]+@[a-zA-z0-9]+\.[a-zA-z0-9]+$/",$email)) {
            $errorMes = 'Email is required and must be a valid email address with less than 255 characters.';
        }
        else if (empty($fullName) || strlen($fullName)>255) {
            $errorMes = 'Full Name is required and must be less than 255 characters.';
        }
        else if (empty($phoneNum) || !preg_match('/^\d{10}$/', $phoneNum)) {
            $errorMes = 'Phone number is required and must be 10 digits.';
        }
        return $errorMes;
    }

    function validateUserLogIn($data){
        $errorMes = '';
        $email = validateInput($data->email); 
        $password = $data->password;
        $phoneNum = validateInput($data->phoneNum);
        if (empty($email) && empty($phoneNum)) {
            $errorMes = 'Email is required or phone number is require';
        }
        else if (empty($password)) {
            $errorMes = "Password is required";
        }
        return $errorMes;
    }

    function validateProperty($data){
        $errorMes = '';
        $name = validateInput($data->name);
        $area= $data->area;
        $location = validateInput($data->location);
        $description = validateInput($data->description);
        $imageURL = validateInput($data->imageURL);
        $price = $data->price;
        $initialSlot = $data->initialSlot;
        if (empty($name)){
            $errorMes = 'Name is required!';
        }
        else if (empty($location)){
            $errorMes = 'Location is required!';
        }
        else if (empty($description)){
            $errorMes = 'Description is required!';
        }
        else if (empty($imageURL)){
            $errorMes = 'ImageURL is required!';
        }
        else if (empty($price) ||  $price <= 0){
            $errorMes = 'Price is required and must be a number greater than 0!';
        }
        else if (empty($area) ||  $area <= 0){
            $errorMes = 'Area is required and must be a number greater than 0!';
        }
        else if (empty($initialSlot) ||  $initialSlot<=0){
            $errorMes = 'Initial slot is required and must be a number greater than 0!';
        }
        return $errorMes;
    }

?>