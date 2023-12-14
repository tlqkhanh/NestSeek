<?php
    class Bill {
        public $billID;
        public $tax;
        public $initialAmount;
        public $totalAmount;
        public $forRentID;
        public $status;
        public $createdDate;
        public $paidDate;
        private $conn;
    
        // Constructor with optional parameters
        public function __construct(
            $conn,
            $billID = null,
            $forRentID = null,
            $tax = null,
            $initialAmount = null,
            $totalAmount = null,
            $status = 'pending',
            $createdDate = null,
            $paidDate = null,
        ) {
            $this->conn = $conn;
            $this->billID = $billID;
            $this->tax = $tax;
            $this->initialAmount = $initialAmount;
            $this->totalAmount = $totalAmount;
            $this->forRentID = $forRentID;
            $this->status = $status;
            $this->createdDate = $createdDate;
            $this->paidDate = $paidDate;
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
            $query = "SELECT B.*, P.name, R.period FROM Bill B
                      JOIN Rent R ON B.for_rentID = R.rentID
                      JOIN Property P ON P.propertyID = R.propertyID
                      WHERE R.renterID = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $result = $stmt->get_result();
            $bills = [];
            while ($row = $result->fetch_assoc()) {
                $bills[] = $row;
            }
            $stmt->close();
            return $bills;
        }

        public static function getBillById($conn, $billId) {
            $query = "SELECT Bill.*, Rent.period, Property.name, Renter.user_name AS renterName, Owner.user_name AS ownerName
            FROM Bill
            JOIN Rent ON Bill.for_rentID = Rent.rentID
            JOIN Property ON Rent.propertyID = Property.propertyID
            JOIN User AS Renter ON Rent.renterID = Renter.userID
            JOIN User AS Owner ON Property.ownerID = Owner.userID
            WHERE bill.billID = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("i", $billId);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $billInfo = $result->fetch_assoc();
                $stmt->close();
                return $billInfo;
            } else {
                $stmt->close();
                return null; // No bill found with the given ID
            }
        }
    }

?>