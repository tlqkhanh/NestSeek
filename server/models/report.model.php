<?php
    class Report {
        public $reportID;
        public $reportType;
        public $reportedID;
        public $reporterID;
        public $reportDate;
        public $reason;
        private $conn;
    
        // Constructor with optional parameters
        public function __construct(
            $conn,
            $reportID = null,
            $reportType = null,
            $reportedID = null,
            $reporterID = null,
            $reportDate = null,
            $reason = null
        ) {
            $this->conn = $conn;
            $this->reportID = $reportID;
            $this->reportType = $reportType;
            $this->reportedID = $reportedID;
            $this->reporterID = $reporterID;
            $this->reportDate = $reportDate;
            $this->reason = $reason;
        }
    
        // Method to add a report instance to the database
        public function createReport() {
            // Prepare an SQL INSERT statement
            $query = "INSERT INTO Report (report_type, reportedID, reporterID, report_date, reason) VALUES (?, ?, ?, ?, ?)";
            $stmt = $this->conn->prepare($query);
    
            // Bind parameters
            $stmt->bind_param("siss", $this->reportType, $this->reportedID, $this->reporterID, $this->reportDate, $this->reason);
    
            // Execute the insert
            $result = $stmt->execute();
    
            // Close the statement
            $stmt->close();
    
            return $result; // Return true if the insert was successful, false otherwise
        }
    
        // Method to delete a report from the database
        public function deleteReport() {
            // Prepare an SQL DELETE statement
            $query = "DELETE FROM Report WHERE reportID = ?";
            $stmt = $this->conn->prepare($query);
    
            // Bind parameters
            $stmt->bind_param("i", $this->reportID);
    
            // Execute the delete
            $result = $stmt->execute();
    
            // Close the statement
            $stmt->close();
    
            return $result; // Return true if the delete was successful, false otherwise
        }
    
        // Static method to get all reports
        public static function getAllReports($conn) {
            // Prepare an SQL SELECT statement
            $query = "SELECT * FROM Report";
            $result = $conn->query($query);
    
            // Fetch the result
            $reports = [];
            while ($row = $result->fetch_assoc()) {
                // Add report information to the array
                $reports[] = new Report($conn, $row['reportID'], $row['report_type'], $row['reportedID'], $row['reporterID'], $row['report_date'], $row['reason']);
            }
    
            return $reports;
        }

        public function __destruct() {
            $this->conn->close();
        }
    }
    


?>