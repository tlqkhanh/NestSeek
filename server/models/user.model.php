<?php
    class User {
        public $userID;
        public $userName;
        public $email;
        public $password;
        public $type;
        public $fullName;
        public $phoneNum;
        public $bankNum;
        public $bankName;
        public $status;
        private $conn;
    
        // Constructor with optional parameters
        public function __construct($conn, $userID = null, $userName = null, $email = null, $phoneNum = null, $password = null, $type = null, $fullName = null, $bankNum = null, $bankName = null, $status = 'normal') {
            $this->conn = $conn;
            $this->userID = $userID;
            $this->userName = $userName;
            $this->email = $email;
            $this->password = $password;
            $this->type = $type;
            $this->fullName = $fullName;
            $this->phoneNum = $phoneNum;
            $this->bankNum = $bankNum;
            $this->bankName = $bankName;
            $this->status = $status;
        }

        public function haveUserExisted() {
            $checkQuery = "SELECT COUNT(*) as count FROM User WHERE email = ? OR phone_number = ?";
            $checkStmt = $this->conn->prepare($checkQuery);
            $checkStmt->bind_param("ss", $this->email, $this->phoneNum);
            $checkStmt->execute();
            $checkResult = $checkStmt->get_result();
            $count = $checkResult->fetch_assoc()['count'];
            $checkStmt->close();
    
            return $count > 0;
        }

        public function createUser() {
            if ($this->haveUserExisted()) {
                return false; // User already exists, don't create a duplicate
            }
    
            // Insert the new user into the database
            $insertQuery = "INSERT INTO User (user_name, email, password, user_type, full_name, phone_number, bank_number, bank_name, status)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $insertStmt = $this->conn->prepare($insertQuery);
            $hashedPassword = password_hash($this->password, PASSWORD_DEFAULT);
            $insertStmt->bind_param("sssssssss", $this->userName, $this->email, $hashedPassword, $this->type, $this->fullName, $this->phoneNum, $this->bankNum, $this->bankName, $this->status);
            $result = $insertStmt->execute();
            $insertStmt->close();
    
            return $result; // Return true if insertion was successful, false otherwise
        }

        public function validateUser() {
            $existingUser = $this->getUserWithSameEmailOrPhone();

            if ($existingUser && password_verify($this->password,$existingUser['password'])) {
                return $existingUser;
            }

            return false;
        }
    
        private function getUserWithSameEmailOrPhone() {
            $query = "SELECT * FROM User WHERE email = ? OR phone_number = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ss", $this->email, $this->phoneNum);
            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();
            $stmt->close();
    
            return $user;
        }

        public function updateUserInfo() {
            // Prepare an SQL UPDATE statement
            $query = "UPDATE User SET user_name = ?, full_name = ?, bank_number = ?, bank_name = ?, WHERE userID = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ssssi", $this->userName ,$this->fullName , $this->bankNum, $this->bankName , $this->userID);
            $result = $stmt->execute();
    
            // Close the statement
            $stmt->close();
    
            return $result; // Return true if the update was successful, false otherwise
        }

        public static function getUserById($userId,$conn) {
            $userID = $userName = $email = $userType = $fullName = $phoneNumber = $bankNumber = $bankName = null;
            $query = "SELECT userID, user_name, email, user_type, full_name, phone_number, bank_number, bank_name FROM User WHERE userID = ?";
            $stmt = $conn->prepare($query);
        
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $stmt->bind_result($userID, $userName, $email, $userType, $fullName, $phoneNumber, $bankNumber, $bankName);
            $stmt->fetch();
            $stmt->close();
            if ($userID !== null) {
                // Return user information as an associative array
                return [
                    'userID' => $userID,
                    'user_name' => $userName,
                    'email' => $email,
                    'user_type' => $userType,
                    'full_name' => $fullName,
                    'phone_number' => $phoneNumber,
                    'bank_number' => $bankNumber,
                    'bank_name' => $bankName,
                ];
            } else {
                // User not found
                return null;
            }
        }

        public static function toggleUserStatus($userId, $conn) {
            $currentStatus = self::getUserStatus($userId, $conn);
    
            // Toggle the status
            $newStatus = ($currentStatus == 'normal') ? 'blocked' : 'normal';
    
            // Prepare an SQL UPDATE statement to update the user status
            $query = "UPDATE User SET status = ? WHERE userID = ?";
            $stmt = $conn->prepare($query);
    
            // Bind parameters
            $stmt->bind_param("si", $newStatus, $userId);
    
            // Execute the update
            $result = $stmt->execute();
    
            // Close the statement
            $stmt->close();
    
            return $result; // Return true if the update was successful, false otherwise
        }
    
        private static function getUserStatus($userId, $conn) {
            $status = null;
            $query = "SELECT status FROM User WHERE userID = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $stmt->bind_result($status);
            $stmt->fetch();
            $stmt->close();
            return $status;
        }

        public static function deleteUserById($userId, $conn) {
            $query = "DELETE FROM User WHERE userID = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("i", $userId);
            $result = $stmt->execute();
            $stmt->close();
    
            return $result;
        }

    }
    





?>