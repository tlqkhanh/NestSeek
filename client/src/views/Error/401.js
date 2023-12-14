import React from "react";
import { Link } from "react-router-dom";
export default function Error401() {
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
          <h1 style={{textAlign: "center", fontSize: "2rem"}}>401: You are not authenticated! <Link to={'/'} style={{color:"green"}}>Go Back</Link></h1>
        </div>
      );
}
