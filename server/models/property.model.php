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
    
            $query = "INSERT INTO Property (name, area, location, description, imageURL, price, created_at, initial_slot, cur_slot, status, ownerID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $this->conn->prepare($query);
    
            $stmt->bind_param("sdsssdssisi", $this->name, $this->area, $this->location, $this->description, $this->imageURL, $this->price, $this->createdDate, $this->initialSlot, $this->curSlot, $this->status, $this->owner);

            $result = $stmt->execute();
    
            // Close the statement
            $stmt->close();
    
            return $result; // Return true if the insert was successful, false otherwise
        }

        public static function getPropertyById($conn, $propertyId) {
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
                return [
                    'propertyID' => $propertyID,
                    'name' => $name,
                    'area' => $area,
                    'location' => $location,
                    'description' => $description,
                    'imageURL' => $imageURL,
                    'price' => $price,
                    'createdDate' => $created_at,
                    'initialSlot' => $initial_slot,
                    'curSlot' => $cur_slot,
                    'status' => $status,
                    'ownerID' => $owner,
                ];
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

        public static function getAllProperty($conn, $search = null) {
            // Prepare an SQL SELECT statement with optional search condition
            $query = "SELECT * FROM Property WHERE
                      name LIKE CONCAT('%', ?, '%') OR
                      location LIKE CONCAT('%', ?, '%')";
    
            // If $search is null, retrieve all records
            if ($search === null) {
                $query = "SELECT * FROM Property";
            }
    
            $stmt = $conn->prepare($query);
    
            // Bind parameters
            if ($search !== null) {
                $stmt->bind_param("ss", $search, $search);
            }
    
            // Execute the query
            $stmt->execute();
            

            $propertyID =$name = $area = $location = $description = $imageURL = $price = $created_at = $initial_slot = $cur_slot = $status = $owner = null;
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
                $properties[] = new Property(
                    $conn,
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
                    $status
                );
            }
    
            // Close the statement
            $stmt->close();
    
            return $properties;
        }
    }
    


?>