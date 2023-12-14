import React, { useEffect, useState } from "react";
import { FaSearch } from 'react-icons/fa';
import Header from "../../components/header";
import List from "../../components/list";
import datapost from './datapost';
import axios from "axios";
export default function Youradvertise() {
  const [propertyList,setPropertyList] = useState();

  const fetchData = async () => {
    let url = "http://localhost:9000/server/api/property/getUserPropertyList.php";
    try {
        axios.get(url,{
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response=>{
            if (response.status>=200 && response.status<400){
                setPropertyList(response.data.propertyList);
            }
        })
        .catch(err => {
            if (err.response.status==401) window.location.href = "/401";
            alert(`Error: ${err.response.data.message}`);
            // console.log(err);
        })
    } catch (error) {
        console.error('Error fetching property detail:', error);
    }
  };

  useEffect(()=>{
    fetchData();
  },[]);

    const customcss=`
    .icon
    {
        margin-right:20px;
    }
    .search
    {
        border-bottom: solid 1px #86BEC2;
    }
    .top
    {
        margin:70px 0px 60px 0px;
    }
    .bg-bluelight
    {
        padding: 10px 30px 10px 30px;
    }
    `
    ;
    return (
        <div className="flex-grow">
          <div className="flex justify-center mt-12 mb-12">
            <h1 className="text-blue1 font-bold text-4xl">Your Advertise</h1>
          </div>
          
          {(propertyList && propertyList.length > 0)? 
            <div className="flex justify-center items-center p-10 m-3">
              <List data={propertyList} />
            </div>
          : <div>You have no property</div>
          }
          
          
          <style>{customcss}</style>
        </div>
      );
}
