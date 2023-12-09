import React, { useEffect, useState } from "react";
import { FaSearch } from 'react-icons/fa';
import Header from "../../components/header";
import List from "../../components/list";
import Data from './dataexplore';
import { getPropertyList } from "../../action/property.action";
export default function Explore() {

  const [propertyList, setPropertyList] = useState([]);
  const fetchData = async () => {
    try {
      const response = await getPropertyList();
      setPropertyList(response.data.propertyList);
    } catch (error) {
      console.error('Error fetching property list:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])


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
            <div className="flex flex-wrap justify-between p-20 xl:ml-20 xl:mr-20">
              <div className="flex items-center text-darkblue search">
                <span className="ml-2">
                  <FaSearch className="text-bluelight icon" />
                </span>
                <input
                  type="text"
                  className="w-full focus:outline-none"
                  placeholder="Search..."
                />
              </div>
              <div className="flex items-center">
                <button className="bg-bluelight hover:bg-blue1 text-white font-bold py-2 px-4 rounded">
                  Advertise
                </button>
              </div>
            </div>
          <div className="flex justify-center items-center">
          {propertyList.length!=0 
          ? <div className="flex justify-center">
              <List data={propertyList} />
            </div>
          : <p>There is no property!!!</p>
          }
          
          </div>
          
          <style>{customcss}</style>
        </div>
      );
}
