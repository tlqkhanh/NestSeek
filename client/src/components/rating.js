import React, { useState } from "react";
import { FaStar } from 'react-icons/fa';
const RatingFrame = ({ userType }) => {
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);

  const handleRatingClick = (value) => {
    if (userType === 'renter' && !rated) {
      setRating(value);
      setRated(true);
    } else if (rated) {
      alert('You have already rated.');
    } else {
      alert('Only renters can rate.');
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingClick(i)}
          style={{ cursor: (userType === 'renter' && !rated) ? 'pointer' : 'not-allowed' }}
        >
          {i <= rating ? <FaStar color="gold"></FaStar> : <FaStar></FaStar> }
        </span>
      );
    }
    return stars;
  };

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
