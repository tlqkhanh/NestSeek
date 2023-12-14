import React, { useEffect, useState } from "react";
import { FaStar } from 'react-icons/fa';
import axios from "axios";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
const RatingFrame = ({ userType}) => {
  const cookies = new Cookies();
  let uid = cookies.get('uid');
  uid = uid?uid:0;
  const propertyID = useParams('post_id').post_id;
  const [rating, setRating] = useState(0);

  const handleRatingClick = (value) => {
    if (uid===0){
      alert('Only login renters can rate.');
    }
    else{
      try {
        axios.post(`http://localhost:9000/server/api/rating/rate.php`,{
            propertyID: propertyID,
            userID: uid,
            rate: value,
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response=> {
            if (response.status>=200 && response.status<400){
                setRating(value);
            }
        })
        .catch(err => {
            alert(err.response.data.message)
            console.log("Error: ", err.response.data)
        })
    } catch (error) {
        console.log(error);
    }
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingClick(i)}
          style={{ cursor: (userType === 'renter') ? 'pointer' : 'not-allowed' }}
        >
          {i <= rating ? <FaStar color="gold"></FaStar> : <FaStar></FaStar> }
        </span>
      );
    }
    return stars;
  };

  useEffect(()=>{
    try {
      axios.get(`http://localhost:9000/server/api/rating/getRenterRatingForProperty.php?userID=${uid}&propertyID=${propertyID}`,
      {
          headers: {
              "Content-Type": "application/json"
          }
      })
      .then(response=> {
          if (response.status>=200 && response.status<400){
              setRating(response.data.rating);
          }
      })
      .catch(err => {
          console.log("Error: ", err.response.data.message)
      })
    } catch (error) {
        console.log(error);
    }
  },[])
  

  return (
    <div>
      {/* <p>Rating: {rating}</p> */}
      <div className="flex pt-4 pb-4">
        {renderStars()}
      </div>
    </div>
  );
};

export default RatingFrame;
