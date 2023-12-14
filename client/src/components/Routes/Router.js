import { useState } from "react";
import { useRoutes } from "react-router-dom";

//begin homepage layout
import HomepageLayout from "../Layout/HomepageLayout";
import Homepage from "../../views/homepage";
//end homepage layout

//begin guest layout
import GuestLayout from "../Layout/GuestLayout";
import AboutUs from "../../views/AboutUs/AboutUs";
import Explore from "../../views/Explore/explore";
import Detail from "../../views/Explore/exploredetail";
import LoginPage from "../../views/Authenticate/LoginPage";
import SignUp from "../../views/Authenticate/SignUp/SignUp";
//end guest layout

//begin user layout
import UserAppLayout from "../Layout/UserAppLayout";
import Youradvertise from "../../views/ManageAccount/youradvertise";
import BookingHistory from "../../views/ManageAccount/bookinghistory";
import PaymentHistory from "../../views/ManageAccount/paymenthistory";
import Bill from "../../views/ManageAccount/bill";
import Profile from "../../views/Profile/Profile";
import Response from "../../views/Response/Response";
import EditProperty from "../../views/Response/EditProperty";

//end user layout

//begin admin layout
import AdminLayout from "../Layout/AdminLayout";
import PendingPost from "../../views/Pending/PendingPost";
import Report from "../../views/Report/ReportList";
//end admin layout


//begin error layout
import ErrorLayout from "../Layout/ErrorLayout";
import Error401 from "../../views/Error/401";
import Error403 from "../../views/Error/403";

//end erro layout

export default function Router() {
  const routes = useRoutes([
    {
      element: <HomepageLayout/>,
      children: [
        {element: <Homepage />, index:true,},
      ]
    },
    {
      element: <GuestLayout />,
      children: [
        { path: "about-us", element: <AboutUs /> },
        { path: "explore", element: <Explore></Explore> },
        { path: "explore/postDetail/:post_id", element:<Detail></Detail>},
        { path:"log-in", element: <LoginPage /> },
        { path:"advertise", element: <Response></Response> },
        {path: "advertise/edit/:post_id", element: <EditProperty></EditProperty>},

        { path:"sign-up", element: <SignUp/> },

      ]
    },
    {
      element: <UserAppLayout />,
      children: [
        { path:"my/your-advertise", element:<Youradvertise></Youradvertise>},
        { path:"my/booking-history",element:<BookingHistory></BookingHistory>},
        { path:"my/payment-history",element:<PaymentHistory></PaymentHistory>},
        { path:"my/bill",element:<Bill></Bill>},
        { path:"my/profile",element: <Profile></Profile>},
        // { path:"profile/:profileid",element: <Profile></Profile>},

      ],
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
    {
      element: <ErrorLayout/>,
      children: [
        {path: "401", element: <Error401/>},
        {path: "403", element: <Error403/>},
      ]
    },
  ]);
  return routes;
}
