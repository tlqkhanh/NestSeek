<?php
    class Rating {
        public $ratingID;
        public $rate;
        public $userID;
        public $propertyID;
        private $conn;
    
        // Constructor with optional parameters
        public function __construct(
            $conn,
            $ratingID = null,
            $rate = null,
            $userID = null,
            $propertyID = null
        ) {
            $this->conn = $conn;
            $this->ratingID = $ratingID;
            $this->rate = $rate;
            $this->userID = $userID;
            $this->propertyID = $propertyID;
        }
    
        // Method to add a rating instance to the database
        public function createRating() {
            // Prepare an SQL INSERT statement
            $query = "INSERT INTO Rating (rate, userID, propertyID) VALUES (?, ?, ?, ?)";
            $stmt = $this->conn->prepare($query);
    
            // Bind parameters
            $stmt->bind_param("iii", $this->rate, $this->userID, $this->propertyID);
    
            // Execute the insert
            $result = $stmt->execute();
    
            // Close the statement
            $stmt->close();
    
            return $result; // Return true if the insert was successful, false otherwise
        }
    
        // Static method to get all ratings for a specific property
        public static function getAllRatingOfProperty($conn, $propertyId) {
            // Prepare an SQL SELECT statement
            $query = "SELECT * FROM Rating WHERE propertyID = ?";
            $stmt = $conn->prepare($query);
    
            // Bind parameters
            $stmt->bind_param("i", $propertyId);
    
            // Execute the query
            $stmt->execute();
    
            // Declare variables to store the result
            $ratingID = $rate = $userID = $status = null;
    
            // Bind result variables
            $stmt->bind_result($ratingID, $rate, $userID, $propertyId, $status);
    
            // Fetch the result
            $ratings = [];
            while ($stmt->fetch()) {
                // Add rating information to the array
                $ratings[] = new Rating($conn, $ratingID, $rate, $userID, $propertyId, $status);
            }
    
            // Close the statement
            $stmt->close();
    
            return $ratings;
        }
    
        // Static method to get all ratings for a specific owner
        public static function getAllRatingOfOwner($conn, $userId) {
            // Prepare an SQL SELECT statement
            $query = "SELECT * FROM Rating R
                      JOIN Property P ON R.propertyID = P.propertyID
                      WHERE P.ownerID = ?";
            $stmt = $conn->prepare($query);
    
            // Bind parameters
            $stmt->bind_param("i", $userId);
    
            // Execute the query
            $stmt->execute();
    
            // Declare variables to store the result
            $ratingID = $rate = $userID = $propertyID = $status = null;
    
            // Bind result variables
            $stmt->bind_result($ratingID, $rate, $userID, $propertyID, $status);
    
            // Fetch the result
            $ratings = [];
            while ($stmt->fetch()) {
                // Add rating information to the array
                $ratings[] = new Rating($conn, $ratingID, $rate, $userID, $propertyID, $status);
            }
    
            // Close the statement
            $stmt->close();
    
            return $ratings;
        }

        public static function getAvgRatingOfOwner($conn, $userId) {
            // Prepare an SQL SELECT statement to calculate the average rating
            $query = "SELECT COALESCE(AVG(rate), 0) as avgRating FROM Rating R
                      JOIN Property P ON R.propertyID = P.propertyID
                      WHERE P.owner = ?";
            $stmt = $conn->prepare($query);
        
            // Bind parameters
            $stmt->bind_param("i", $userId);
        
            // Execute the query
            $stmt->execute();
        
            // Bind result variables
            $avgRating = 0.0;
            $stmt->bind_result($avgRating);
        
            // Fetch the result
            $stmt->fetch();
        
            // Close the statement
            $stmt->close();
        
            return round($avgRating,1);
        }

            // Static method to get the average rating of a property
        public static function getAvgRatingOfProperty($conn, $propertyId) {
            // Prepare an SQL SELECT statement to calculate the average rating
            $query = "SELECT COALESCE(AVG(rate), 0) as avgRating FROM Rating WHERE propertyID = ?";
            $stmt = $conn->prepare($query);

            // Bind parameters
            $stmt->bind_param("i", $propertyId);

            // Execute the query
            $stmt->execute();

            // Bind result variables
            $avgRating = 0.0;
            $stmt->bind_result($avgRating);

            // Fetch the result
            $stmt->fetch();

            // Close the statement
            $stmt->close();

            return round($avgRating,1);
        }

    }



?>