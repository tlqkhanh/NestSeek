// import React from "react";
// import { Link } from "react-router-dom";
// // import classNames from "classnames";
// import AdminCard from "./AdminCard";

// const AdminHeader = ({ isLoggedIn, userType }) => {
//   // const renderUserOptions = () => {
//   //   if (isLoggedIn) {
//   //     if (userType === 'user') {
//   //       return (
//   //         <button className="border-15 border-darkblue bg-white hover:text-white text-darkblue font-bold py-2 px-4 rounded">
//   //           Manage User Account
//   //         </button>
//   //       );
//   //     } else if (userType === 'admin') {
//   //       return (
//   //         <button className="border-15 border-darkblue bg-white hover:text-white hover:bg-darkblue text-darkblue font-bold py-2 px-4 rounded">
//   //           Manage Admin Account
//   //         </button>
//   //       );
//   //     }
//   //   }
//   //   return null;
//   // };
//   const customstyle=
//   {
//     addborder:
//     {
//       border: '1px solid #013034',
//       padding: '5px 20px 5px 20px',
//       marginLeft: '15px',
//     },
//     header:
//     {
//       margin:'20px 40px',
//     },
//   };
//   return (
//     <div className="flex justify-end">
//       <header style={customstyle.header}>
//         <nav>
//           <ul className="flex">
//             <li>
//               <button className="border-15 border-darkblue bg-white text-darkblue font-bold py-2 px-4 rounded">
//                     <Link to="/about-us">About Us</Link>
//               </button>
//             </li>
//             <li>
//               <button className="border-15 border-darkblue bg-white text-darkblue font-bold py-2 px-4 rounded">
//                     <Link to="/explore">Explore</Link>
//               </button>
//             </li>
//             <li>
//               <button className="border-15 border-darkblue bg-white text-darkblue font-bold py-2 px-4 rounded">
//                     <Link to="/explore">Advertise</Link>
//               </button>
//             </li>
//             {isLoggedIn === 'true' ? (
//               <li>
//                 {/* <button className={classNames("border border-darkblue bg-white text-darkblue hover:bg-gray-200 font-bold ", "flex flex-row justify-center items-center py-2 px-4 rounded-xl")}> */}
//                   {/* <div className="px-3"> */}
//                   {/* <UserIcon className="w-6 h-6"/></div> */}
//                   {/* <ChevronDownIcon className="w-4 h-4" /> */}
//                   {/* <div>Account</div> */}
//                 {/* </button> */}
//                 <AdminCard/>
//                 {/* <div className="options">
//                   {renderUserOptions()}
//                 </div> */}
//               </li>
//             ) : (
//               <>
//                 <li>
//                   <button className="border-15 border-darkblue hover:bg-medium hover:text-white bg-white text-darkblue font-bold py-2 px-4 rounded addborder" style={customstyle.addborder}>
//                     <Link to="/signup">Sign Up</Link>
//                   </button>
//                 </li>
//                 <li>
//                   <button className="border-15 border-darkblue hover:bg-medium hover:text-white bg-white text-darkblue font-bold py-2 px-4 rounded addborder" style={customstyle.addborder}>
//                     <Link to="/login">Log In</Link>
//                   </button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </nav>
//       </header>
//     </div>
//   );
// };

// export default AdminHeader;
// // 


import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminCard from "./AdminCard";
import logo from "../../assets/logo.png";
const AdminHeader = ({ isLoggedIn, userType }) => {
  const renderUserOptions = () => {
    if (isLoggedIn) {
      if (userType === 'admin') {
        return (
          <AdminCard></AdminCard>
        );
      }
      else {
        return (
          <AdminCard></AdminCard>
        );
      }
    }
    return null;
  };
  const customstyle=
  {
    addborder:
    {
      padding: '5px 20px 5px 20px',
      marginLeft: '15px',
    },
    header:
    {
      margin:'20px 40px',
    },
  };

  return (
      <header style={customstyle.header}>
        <div className="hidden md:block ">       
          <div className="flex flex-row items-center justify-center gap-12 md:gap-24 ">
            <img
            src={logo}
            alt="logo"
            className="w-[8%] h-[8%] ml-10"
            />
            <button className=" bg-white text-blue2 font-bold py-2 px-4 rounded justify-end">
                  <Link to="/about-us">About Us</Link>
            </button>
            <button className=" bg-white text-blue2 font-bold py-2 px-4 rounded">
                    <Link to="/explore">Explore</Link>
            </button>
            <button className=" bg-white text-blue2 font-bold py-2 px-4 rounded">
                  <Link to="/explore">Advertise</Link>
            </button>
            <button className=" bg-white text-blue2 font-bold py-2 px-4 rounded justify-end">
                  <Link to="pending-post">Pending Post</Link>
            </button>
            <button className=" bg-white text-blue2 font-bold py-2 px-4 rounded justify-end">
                  <Link to="report-list">Report List</Link>
            </button>
            <div className="options justify-end">
              {renderUserOptions()}
            </div>
          </div>
        </div>         
      </header>
  );
};
export default AdminHeader;
