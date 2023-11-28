import React from "react";
import { FaSearch } from 'react-icons/fa';
import Header from "../../components/header";
import List from "../../components/list";
import Data from './dataexplore';
export default function Explore() {
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
    @media screen and (max-width: 1000px) {
      .grid {
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
      }
  }
  
  @media screen and (max-width: 768px) {
      .grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
      }
  }
    `
    ;
    return (
        <div className="flex-grow">
          <Header/>
          <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-5 top">
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
              <div></div>
              <div></div>
              <div className="flex justify-end items-center">
                <button className="bg-bluelight hover:bg-blue1 text-white font-bold py-2 px-4 rounded">
                  Advertise
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <List data={Data} />
          </div>
          
          <style>{customcss}</style>
        </div>
      );
}
