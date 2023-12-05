// import { Outlet } from "react-router-dom";
// // import Footer from "../footer";
// // import Header from "../header";
//import AdminHeader from "../Header/AdminHeader";

// export default function AdminLayout() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <AdminHeader isLoggedIn= 'true' userType='admin'/>
//       <div className="flex-grow flex">
//         <Outlet/>
//       </div>
//       {/* <Footer /> */}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { authenticate, authorize } from "../../action/auth.action";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import AdminHeader from "../Header/AdminHeader";
import Footer from "../footer";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isAuth,setIsAuth] = useState(false);
  const [userType,setUserType] = useState('guest');
  useEffect(()=>{
    const cookies = new Cookies();
    const token = cookies.get('token');
    const userType = cookies.get('type');

    authorize(token)
    .then(res => {
      console.log(res);
      setIsAuth(true);
      setUserType(userType);
    })
    .catch(error => {
      // console.log(error.response)
      console.log(error);
      navigate('/403');
    })
  }, [])


  return (
    <div className="flex flex-col min-h-screen">
      {isAuth && <AdminHeader isLoggedIn={isAuth} userType={userType}/>}
      {isAuth && <div className="flex-grow flex">
        <Outlet/>
      </div>}
      {isAuth && <Footer />}
    </div>
  );
}