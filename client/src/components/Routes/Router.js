import { useState } from "react";
import { useRoutes } from "react-router-dom";
import UserAppLayout from "../Layout/UserAppLayout";
import AboutUs from "../../views/AboutUs/AboutUs";
import Homepage from "../../views/homepage";
import Report from "../../views/Report/ReportList";
import PendingPost from "../../views/Pending/PendingPost";
import Explore from "../../views/Explore/explore";
import Detail from "../../views/Explore/exploredetail";
import Youradvertise from "../../views/ManageAccount/youradvertise";
import BookingHistory from "../../views/ManageAccount/bookinghistory";
import PaymentHistory from "../../views/ManageAccount/paymenthistory";
import HomepageLayout from "../Layout/HomepageLayout";
import AdminLayout from "../Layout/AdminLayout";
import AuthenticateSignUp from "../../views/Authenticate/SignUp/SignUp";
import Login from "../../views/Authenticate/Login";
import useToken from "../../views/Authenticate/useToken";
import LoginPage from "../../views/Authenticate/LoginPage";
import SignUp from "../../views/Authenticate/SignUp/SignUp";
import SignUpPage from "../../views/Authenticate/SignUp/SignUpPage";

export default function Router() {
  const { token, setToken } = useToken();

  const routes = useRoutes([
    {
      element: <UserAppLayout />,
      children: [
        { path: "about-us", element: <AboutUs /> },
        { path: "admin", element: <Homepage /> },
        { path: "explore", element: <Explore></Explore> },
        { path: "postDetail/:post_id", element:<Detail></Detail>},
        { path:"your-advertise", element:<Youradvertise></Youradvertise>},
        { path:"booking-history",element:<BookingHistory></BookingHistory>},
        { path:"payment-history",element:<PaymentHistory></PaymentHistory>},
        // { path:"sign-up", element: <AuthenticateSignUp/> },
      ],
    },
    {
      element: <HomepageLayout/>,
      children: [
        {element: <Homepage />, index:true,},
        { path:"log-in", element: <LoginPage /> },
        { path:"sign-up", element: <SignUpPage /> },
      ]
    },
    // Route for Admin Role
    {
      path: "/admin",
      element: <AdminLayout/>,
      children: [
        { path: "pending-post", element: <PendingPost />},
        { path: "report-list", element: <Report/>},
      ]
    },
  ]);

  // if(!token) {
  //   return <LoginPage setToken={setToken} />
  // }

  return routes;
}
