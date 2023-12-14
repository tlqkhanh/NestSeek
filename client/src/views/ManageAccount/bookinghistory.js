import React from "react";
import datapost from './datapost';
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function BookingHistory() {
  const [rentList, setrentList] = useState([]);

  const fetchData = async () => {
    try {
      axios.get(`http://localhost:9000/server/api/rent/getRentList.php`,
      {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
      })
      .then(response=> {
          if (response.status>=200 && response.status<400){
              console.log(response.data.message);
              setrentList(response.data.rentList);
              console.log(response.data.rentList);
          }
      })
      .catch(err => {
          console.log("Error: ", err.response.data.message)
      })
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(()=>{
      fetchData();
  },[])

  if (!rentList || rentList.length === 0) return <div>Your rent history is empty!</div>;

  return (
    <div className="flex-grow">
        <div className="flex-grow flex-col items-center justify-center pl-4 pr-4 md:pl-40 md:pr-40 lg:pl-60 lg:60">
        <h1 className="text-3xl font-bold mb-6 flex justify-center text-blue2">Book History</h1>
        <div className="flex flex-col justify-center py-4 ">
      {rentList.map((item, index) => (
        
        <div className='flex items-center border-b border-superlight flex justify-between py-4 px-1'>
          <div className="flex flex-row items-center">
            <div><img 
                src={item.imageURL}
                alt={item.name}
                className="w-10 h-10 rounded-full mr-4"/>
              </div>
            <div className='flex flex-col'>
                <div className='sm:text-lg text-blue2'>{item.name}</div>
                <div className='text-gray-400'>{item.rent_date}</div>
                <div className='text-gray-400'>Status: {item.status}</div>
            </div>
          </div>
          <div>
            <Link to={`/explore/postDetail/${item.propertyID}`}>
              <button className='border rounded bg-bluelight p-2 hover:bg-medium text-white'>Read more</button>
            </Link>
          </div>
        </div>
      ))}
        </div>
        </div>
    </div>
  );
}
