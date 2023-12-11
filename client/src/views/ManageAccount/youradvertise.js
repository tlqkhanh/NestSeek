import React from "react";
import { FaSearch } from 'react-icons/fa';
import Header from "../../components/header";
import List from "../../components/list";
import datapost from './datapost';
export default function Youradvertise() {
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
          
          <div className="flex justify-center items-center p-10 m-3">
            <List data={datapost} />
          </div>
          
          <style>{customcss}</style>
        </div>
      );
}
