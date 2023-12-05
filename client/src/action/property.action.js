import axios from "axios";

const USER_API_URL = "http://localhost:9000/server/api/property";

/*
response.data = array of property object [[ $propertyID;
         $name;
         $area;
         $location;
         $description;
         $imageURL;
         $price;
         $createdDate;
         $initialSlot;
         $curSlot;
         $status;
         $owner;]]

*/
export const getPropertyList = () => {
    return axios.get(`${USER_API_URL}/propertyList.php`,{
        headers: {
            'Content-Type': 'application/json',
        },
    });
};


/*
response.data = property object [ $propertyID;
         $name;
         $area;
         $location;
         $description;
         $imageURL;
         $price;
         $createdDate;
         $initialSlot;
         $curSlot;
         $status;
         $owner;
         $rating;
         $ownerName;
        ]

*/
export const getPropertyDetail = (pId) => {
    return axios.get(`${USER_API_URL}/propertyDetail.php?pId=${pId}`,{
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
