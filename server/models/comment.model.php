<?php
    class Comment {
        public $commentID;
        public $comment;
        public $commentTime;
        public $userID;
        public $propertyID;
        public $isChild;
        public $parentID;
        private $conn;
    
        // Constructor with optional parameters
        public function __construct(
            $conn,
            $commentID = null,
            $comment = null,
            $commentTime = null,
            $userID = null,
            $propertyID = null,
            $isChild = null,
            $parentID = null
        ) {
            $this->conn = $conn;
            $this->commentID = $commentID;
            $this->comment = $comment;
            $this->commentTime = $commentTime;
            $this->userID = $userID;
            $this->propertyID = $propertyID;
            $this->isChild = $isChild;
            $this->parentID = $parentID;
        }
    
        // Method to add a comment instance to the database
        public function createComment() {
            // Prepare an SQL INSERT statement
            $query = "INSERT INTO Comment (comment, comment_time, userID, propertyID, isChild, parentID) VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $this->conn->prepare($query);
    
            // Bind parameters
            $stmt->bind_param("ssiiis", $this->comment, $this->commentTime, $this->userID, $this->propertyID, $this->isChild, $this->parentID);
    
            // Execute the insert
            $result = $stmt->execute();
    
            // Close the statement
            $stmt->close();
    
            return $result; // Return true if the insert was successful, false otherwise
        }
    
        // Method to delete a comment from the database
        public function deleteComment() {
            // Prepare an SQL DELETE statement
            $query = "DELETE FROM Comment WHERE commentID = ?";
            $stmt = $this->conn->prepare($query);
    
            // Bind parameters
            $stmt->bind_param("i", $this->commentID);
    
            // Execute the delete
            $result = $stmt->execute();
    
            // Close the statement
            $stmt->close();
    
            return $result; // Return true if the delete was successful, false otherwise
        }
    
        // Static method to get all comments for a specific property
        public static function getAllTopLevelCommentsOfProperty($conn, $propertyId) {
            // Prepare an SQL SELECT statement
            $query = "SELECT * FROM Comment WHERE propertyID = ? AND isChild = 'no'";
            $stmt = $conn->prepare($query);
        
            // Bind parameters
            $stmt->bind_param("i", $propertyId);
        
            // Execute the query
            $stmt->execute();
        
            // Declare variables to store the result
            $commentID = $comment = $commentTime = $userID = $isChild = $parentID = null;
        
            // Bind result variables
            $stmt->bind_result($commentID, $comment, $commentTime, $userID, $propertyId, $isChild, $parentID);
        
            // Fetch the result
            $comments = [];
            while ($stmt->fetch()) {
                // Add comment information to the array
                $comments[] = new Comment($conn, $commentID, $comment, $commentTime, $userID, $propertyId, $isChild, $parentID);
            }
        
            // Close the statement
            $stmt->close();
        
            return $comments;
        }

        public static function getAllChildrenComment($conn, $parentCommentID) {
            // Prepare an SQL SELECT statement
            $query = "SELECT * FROM Comment WHERE parentID = ?";
            $stmt = $conn->prepare($query);
        
            // Bind parameters
            $stmt->bind_param("i", $parentCommentID);
        
            // Execute the query
            $stmt->execute();
        
            // Declare variables to store the result
            $commentID = $comment = $commentTime = $userID = $propertyID = $isChild = $parentID = null;
        
            // Bind result variables
            $stmt->bind_result($commentID, $comment, $commentTime, $userID, $propertyID, $isChild, $parentID);
        
            // Fetch the result
            $comments = [];
            while ($stmt->fetch()) {
                // Add comment information to the array
                $comments[] = new Comment($conn, $commentID, $comment, $commentTime, $userID, $propertyID, $isChild, $parentID);
            }
        
            // Close the statement
            $stmt->close();
        
            return $comments;
        }

        public function __destruct() {
            $this->conn->close();
        }
    }
    

?>