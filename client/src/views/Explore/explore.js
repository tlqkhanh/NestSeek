import React, { useEffect, useState } from "react";
import { FaSearch } from 'react-icons/fa';
import List from "../../components/list";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
export default function Explore() {
  const cookies = new Cookies();
  const type = cookies.get('type');

  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const [propertyList, setPropertyList] = useState([]);
  const fetchData = async () => {
    try {
      axios.get(`http://localhost:9000/server/api/property/propertyList.php?search=${searchValue}`,
      {
          headers: {
              "Content-Type": "application/json"
          }
      })
      .then(response=> {
          if (response.status>=200 && response.status<400){
              console.log(response.data.message);
              setPropertyList(response.data.propertyList);
          }
      })
      .catch(err => {
          console.log("Error: ", err.response.data.message)
      })
    } catch (error) {
        console.log(error);
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
            <div className="flex flex-col sm:flex-row justify-between p-20 xl:ml-20 xl:mr-20">
                    <div className="flex items-center text-darkblue search">
                        <span className="ml-2">
                        <FaSearch className="text-bluelight icon" />
                        </span>
                        <input
                        type="text"
                        className="w-full focus:outline-none"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleSearchChange}
                        name="search"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            fetchData();
                          }
                        }}
                        />
                    </div>
                    {type=='owner' && <Link to={"/advertise"} className="flex items-center justify-end pt-10 sm:pt-0">
                        <button className="bg-bluelight hover:bg-medium text-white font-bold py-2 px-4 rounded">
                          Advertise
                        </button>
                    </Link>}
                </div>
          <div className="flex justify-center items-center">
          {propertyList.length!==0 
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
