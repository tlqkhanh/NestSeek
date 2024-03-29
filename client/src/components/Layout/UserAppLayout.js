import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { authenticate } from "../../action/auth.action";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Footer from "../footer";
import Header from "../header";

export default function UserAppLayout() {
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
      navigate('/401');
    })
  }, [])


  return (
    <div className="flex flex-col min-h-screen">
      {isAuth && <Header isLoggedIn={isAuth} userType={userType}/>}
      {isAuth && <div className="flex-grow flex">
        <Outlet/>
      </div>}
      {isAuth && <Footer />}
    </div>
  );
}
