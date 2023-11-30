<?php
    class Bill {
        public $billID;
        public $tax;
        public $initialAmount;
        public $totalAmount;
        public $forRentID;
        public $status;
        private $conn;
    
        // Constructor with optional parameters
        public function __construct(
            $conn,
            $billID = null,
            $forRentID = null,
            $tax = null,
            $initialAmount = null,
            $totalAmount = null,
            $status = 'pending'
        ) {
            $this->conn = $conn;
            $this->billID = $billID;
            $this->tax = $tax;
            $this->initialAmount = $initialAmount;
            $this->totalAmount = $totalAmount;
            $this->forRentID = $forRentID;
            $this->status = $status;
        }
    
        // Method to add a bill instance to the database
        public function createBill() {
            // Prepare an SQL INSERT statement
            $query = "INSERT INTO Bill (tax, initial_amount, total_amount, for_rentID, status) VALUES (?, ?, ?, ?, ?)";
            $stmt = $this->conn->prepare($query);
    
            // Bind parameters
            $stmt->bind_param("dddis", $this->tax, $this->initialAmount, $this->totalAmount, $this->forRentID, $this->status);
    
            // Execute the insert
            $result = $stmt->execute();
    
            // Close the statement
            $stmt->close();
    
            return $result; // Return true if the insert was successful, false otherwise
        }
    
        public function payBill() {
            // Prepare an SQL UPDATE statement
            $query = "UPDATE Bill SET status = 'paid' WHERE billID = ?";
            $stmt = $this->conn->prepare($query);
    
            // Bind parameters
            $stmt->bind_param("i", $this->billID);
    
            // Execute the update
            $result = $stmt->execute();
    
            // Close the statement
            $stmt->close();
    
            return $result; // Return true if the update was successful, false otherwise
        }
    
        // Static method to get all bills for a specific user
        public static function getAllBillsOfUser($conn, $userId) {
            // Prepare an SQL SELECT statement
            $query = "SELECT B.* FROM Bill B
                      JOIN Rent R ON B.for_rentID = R.rentID
                      WHERE R.renterID = ?";
            $stmt = $conn->prepare($query);
    
            // Bind parameters
            $stmt->bind_param("i", $userId);
    
            // Execute the query
            $stmt->execute();
    
            // Declare variables to store the result
            $billID = $tax = $initialAmount = $totalAmount = $forRentID = $status = null;
    
            // Bind result variables
            $stmt->bind_result($billID, $tax, $initialAmount, $totalAmount, $forRentID, $status);
    
            // Fetch the result
            $bills = [];
            while ($stmt->fetch()) {
                // Add bill information to the array
                $bills[] = new Bill($conn, $billID, $tax, $initialAmount, $totalAmount, $forRentID, $status);
            }
    
            // Close the statement
            $stmt->close();
    
            return $bills;
        }


        public function __destruct() {
            $this->conn->close();
        }
    }

?>