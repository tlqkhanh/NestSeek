<?php
    class Rent {
        public $rentID;
        public $rentDate;
        public $period;
        public $renterID;
        public $propertyID;
        public $status;
        private $conn;
    
        // Constructor with optional parameters
        public function __construct(
            $conn,
            $rentID = null,
            $renterID = null,
            $propertyID = null,
            $rentDate = null,
            $period = null,
            $status = 'pending'
        ) {
            $this->conn = $conn;
            $this->rentID = $rentID;
            $this->rentDate = $rentDate;
            $this->period = $period;
            $this->renterID = $renterID;
            $this->propertyID = $propertyID;
            $this->status = $status;
        }

        public function createRent() {
            // Prepare an SQL INSERT statement
            $query = "INSERT INTO Rent (rentDate, period, renterID, propertyID, status) VALUES (?, ?, ?, ?, ?)";
            $stmt = $this->conn->prepare($query);
    
            // Bind parameters
            $stmt->bind_param("siiss", $this->rentDate, $this->period, $this->renterID, $this->propertyID, $this->status);
    
            // Execute the insert
            $result = $stmt->execute();
    
            // Close the statement
            $stmt->close();
    
            return $result; // Return true if the insert was successful, false otherwise
        }
    
        // Method to update the status of a rent record in the database
        public function updateRentStatus($status) {
            // Prepare an SQL UPDATE statement
            $query = "UPDATE Rent SET status = ? WHERE rentID = ?";
            $stmt = $this->conn->prepare($query);
    
            // Bind parameters
            $stmt->bind_param("si", $status, $this->rentID);
    
            // Execute the update
            $result = $stmt->execute();
    
            // Close the statement
            $stmt->close();
    
            return $result; // Return true if the update was successful, false otherwise
        }
    
        // Static function to get all rents of a user
        public static function getAllRentOfUser($conn, $userId) {
            // Prepare an SQL SELECT statement
            $query = "SELECT * FROM Rent WHERE renterID = ?";
            $stmt = $conn->prepare($query);
    
            // Bind parameters
            $stmt->bind_param("i", $userId);
    
            // Execute the query
            $stmt->execute();
    
            // Declare variables to store the result
            $rentID = $rentDate = $period = $renterID = $propertyID = $status = null;
    
            // Bind result variables
            $stmt->bind_result($rentID, $rentDate, $period, $renterID, $propertyID, $status);
    
            // Fetch the result
            $rents = [];
            while ($stmt->fetch()) {
                // Add rent information to the array
                $rents[] = new Rent($conn, $rentID, $renterID, $propertyID, $rentDate, $period, $status);
            }
    
            // Close the statement
            $stmt->close();
    
            return $rents;
        }

        public function __destruct() {
            $this->conn->close();
        }
    }
    



?>