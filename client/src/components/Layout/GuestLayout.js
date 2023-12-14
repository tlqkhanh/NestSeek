// import { Outlet } from "react-router-dom";
// import Footer from "../footer";
// import Header from "../header";

// export default function GuestLayout() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <div className="flex-grow flex">
//         <Outlet/>
//       </div>
//       <Footer />
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { authenticate } from "../../action/auth.action";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Footer from "../footer";
import Header from "../header";

export default function GuestLayout() {
  const navigate = useNavigate();
  const [isAuth,setIsAuth] = useState(false);
  const [userType,setUserType] = useState('guest');
  useEffect(()=>{
    const cookies = new Cookies();
    const token = cookies.get('token');
    const userType = cookies.get('type');

    authenticate(token)
    .then(res => {
      console.log(res);
      setIsAuth(true);
      setUserType(userType);
    })
    .catch(error => {
      // console.log(error.response)
      console.log(error);
      //navigate('/401');
    })
  }, [])


  return (
    <div className="flex flex-col ">
      <Header isLoggedIn={isAuth} userType={userType}/>
      <div className="flex flex-grow justify-center">
        <Outlet/>
      </div>
      <Footer />
    </div>
  );
}