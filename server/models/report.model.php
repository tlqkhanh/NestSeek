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
            $query = "INSERT INTO Report (report_type, reportedID, reporterID, reason) VALUES (?, ?, ?, ?)";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("siss", $this->reportType, $this->reportedID, $this->reporterID, $this->reason);
            $result = $stmt->execute();
            $stmt->close();
            return $result;
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
            $query = "SELECT r.*, u.user_name, p.name AS property_name
            FROM Report r
            JOIN User u ON r.reporterID = u.userID
            LEFT JOIN Property p ON r.reportedID = p.propertyID
            WHERE r.report_type = 'property' AND p.status = 'published'";
            $result = $conn->query($query);
            $reports = [];
            while ($row = $result->fetch_assoc()) {
                $reports[] = $row;
            }

            return $reports;

        }
    }
    


?>