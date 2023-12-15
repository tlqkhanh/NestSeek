<?php
    class Property {
        public $propertyID;
        public $name;
        public $area;
        public $location;
        public $description;
        public $imageURL;
        public $price;
        public $createdDate;
        public $initialSlot;
        public $curSlot;
        public $status;
        public $owner; // Assuming this is a reference to the owner's user ID
        private $conn;
    
        // Constructor with optional parameters
        public function __construct($conn,
            $propertyID = null,
            $name = null,
            $owner = null,
            $area = null,
            $location = null,
            $description = null,
            $imageURL = null,
            $price = null,
            $created_at = null,
            $initial_slot = null,
            $cur_slot = null,
            $status = 'pending'
        ) {
            $this->conn = $conn;
            $this->propertyID = $propertyID;
            $this->name = $name;
            $this->area = $area;
            $this->location = $location;
            $this->description = $description;
            $this->imageURL = $imageURL;
            $this->price = $price;
            $this->createdDate = $created_at;
            $this->initialSlot = $initial_slot;
            $this->curSlot = $cur_slot;
            $this->status = $status;
            $this->owner = $owner;
        }

        public function createProperty() {
            if (!$this->owner) {
                return false; // Cannot create a property without an owner
            }
    
            $query = "INSERT INTO Property (name, area, location, description, imageURL, price, initial_slot, cur_slot, ownerID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $this->conn->prepare($query);
    
            $stmt->bind_param("sdsssdiii", $this->name, $this->area, $this->location, $this->description, $this->imageURL, $this->price, $this->initialSlot, $this->curSlot, $this->owner);

            $result = $stmt->execute();
    
            // Close the statement
            $stmt->close();
    
            return $result; // Return true if the insert was successful, false otherwise
        }

        public function updateProperty() {
            $query = "UPDATE property
            SET
                name = ?,
                area = ?,
                location = ?,
                description = ?,
                imageURL = ?,
                price = ?,
                initial_slot = ?
            WHERE propertyID = ?";
            $stmt = $this->conn->prepare($query);
    
            $stmt->bind_param("sdsssdii", $this->name, $this->area, $this->location, $this->description, $this->imageURL, $this->price, $this->initialSlot, $this->propertyID);

            $result = $stmt->execute();
            $stmt->close();
            return $result;
        }

        public function deleteProperty(){
            $query = "DELETE FROM property WHERE propertyID = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("i", $this->propertyID);
            $result = $stmt->execute();
            $stmt->close();
            return $result;
        }

        public function getCurSlot(){
            $query = "SELECT cur_slot FROM Property WHERE propertyID = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("i", $this->propertyID);
            $stmt->execute();
            $result = 0;
            $stmt->bind_result($result);
            $stmt->fetch();
            $stmt->close();
            return $result;
        }

        public function updateCurSlot($curSlot) {
            $query = "UPDATE Property SET cur_slot = ? WHERE propertyID = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ii", $curSlot, $this->propertyID);
            $stmt->execute();
            $stmt->close();
        }

        public function changePropertyStatus($status){
            $query = "UPDATE Property SET status = ? WHERE propertyID = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("si", $status, $this->propertyID);
            $res = $stmt->execute();
            $stmt->close();
            return $res;
        }

        public static function getPropertyById($conn, $propertyId) {
            // Prepare an SQL SELECT statement
            $query = "SELECT * FROM Property WHERE propertyID = ? AND status = 'published'";
            $stmt = $conn->prepare($query);
    
            // Bind parameters
            $stmt->bind_param("i", $propertyId);
    
            // Execute the query
            $stmt->execute();
    
            // Declare variables to store the result
            $propertyID = $name = $area = $location = $description = $imageURL = $price = $created_at = $initial_slot = $cur_slot = $status = $owner = null;
    
            // Bind result variables
            $stmt->bind_result(
                $propertyID,
                $name,
                $area,
                $location,
                $description,
                $imageURL,
                $price,
                $created_at,
                $owner,
                $status,
                $initial_slot,
                $cur_slot
            );
    
            // Fetch the result
            $stmt->fetch();
    
            // Close the statement
            $stmt->close();
    
            // Check if a property was found
            if ($propertyID !== null) {
                // Return property information as an associative array
                return new Property($conn,
                    $propertyID,
                    $name,
                    $owner,
                    $area,
                    $location,
                    $description,
                    $imageURL,
                    $price,
                    $created_at,
                    $initial_slot,
                    $cur_slot,
                    $status,
                    
                );
            } else {
                // Property not found
                return null;
            }
        }

        public static function getPropertyByIdByAdmin($conn, $propertyId) {
            // Prepare an SQL SELECT statement
            $query = "SELECT * FROM Property WHERE propertyID = ?";
            $stmt = $conn->prepare($query);
    
            // Bind parameters
            $stmt->bind_param("i", $propertyId);
    
            // Execute the query
            $stmt->execute();
    
            // Declare variables to store the result
            $propertyID = $name = $area = $location = $description = $imageURL = $price = $created_at = $initial_slot = $cur_slot = $status = $owner = null;
    
            // Bind result variables
            $stmt->bind_result(
                $propertyID,
                $name,
                $area,
                $location,
                $description,
                $imageURL,
                $price,
                $created_at,
                $owner,
                $status,
                $initial_slot,
                $cur_slot
            );
    
            // Fetch the result
            $stmt->fetch();
    
            // Close the statement
            $stmt->close();
    
            // Check if a property was found
            if ($propertyID !== null) {
                // Return property information as an associative array
                return new Property($conn,
                    $propertyID,
                    $name,
                    $owner,
                    $area,
                    $location,
                    $description,
                    $imageURL,
                    $price,
                    $created_at,
                    $initial_slot,
                    $cur_slot,
                    $status,
                    
                );
            } else {
                // Property not found
                return null;
            }
        }

        public static function getAllPropertyOfUser($conn, $userId) {
            // Prepare an SQL SELECT statement
            $query = "SELECT * FROM Property WHERE ownerID = ?";
            $stmt = $conn->prepare($query);
    
            // Bind parameters
            $stmt->bind_param("i", $userId);
    
            // Execute the query
            $stmt->execute();
    
            // Declare variables to store the result
            $propertyID = $name = $area = $location = $description = $imageURL = $price = $created_at = $initial_slot = $cur_slot = $status = $owner = null;
    
            // Bind result variables
            $stmt->bind_result(
                $propertyID,
                $name,
                $area,
                $location,
                $description,
                $imageURL,
                $price,
                $created_at,
                $owner,
                $status,
                $initial_slot,
                $cur_slot
            );
    
            // Fetch the result
            $properties = [];
            while ($stmt->fetch()) {
                // Add property information to the array
                $properties[] = [
                    'propertyID' => $propertyID,
                    'name' => $name,
                    'area' => $area,
                    'location' => $location,
                    'description' => $description,
                    'imageURL' => $imageURL,
                    'price' => $price,
                    'created_at' => $created_at,
                    'initial_slot' => $initial_slot,
                    'cur_slot' => $cur_slot,
                    'status' => $status,
                    'ownerID' => $owner,
                ];
            }
    
            // Close the statement
            $stmt->close();
    
            return $properties;
        }

        public static function getAllProperty($conn, $search = null, $status='published') {
            $query = "SELECT Property.*, User.user_name
              FROM Property 
              LEFT JOIN User ON Property.ownerID = User.userID 
              WHERE (Property.name LIKE CONCAT('%', ?, '%') OR 
                     Property.location LIKE CONCAT('%', ?, '%')) 
                     AND Property.status = ?";

            // If $search is null, retrieve all records
            if ($search === null) {
                $query = "SELECT Property.*, User.user_name
                        FROM Property 
                        LEFT JOIN User ON Property.ownerID = User.userID 
                        WHERE Property.status = ?";
            }

            $stmt = $conn->prepare($query);

            // Bind parameters
            if ($search !== null) {
                $stmt->bind_param("sss", $search, $search, $status);
            } else {
                $stmt->bind_param("s", $status);
            }

            // Execute the query
            $stmt->execute();

            // Fetch the result as an associative array
            $result = $stmt->get_result();

            // Fetch the result
            $properties = [];
            while ($row = $result->fetch_assoc()) {
                // Add property information to the array
                $properties[] = $row;
            }

            // Close the statement
            $stmt->close();

            return $properties;
        }
    }
    


?>