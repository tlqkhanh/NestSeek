<?php
    function validateInput($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    function validateUserSignIn($data){
        $errorMes = '';
        $userName = validateInput($data->username);
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

?>