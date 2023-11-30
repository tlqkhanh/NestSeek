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
export default function Router() {
  const routes = useRoutes([
    {
      element: <UserAppLayout />,
      children: [
        { path: "about-us", element: <AboutUs /> },
        { path: "pending-post", element: <PendingPost />},
        { path: "report-list", element: <Report/>},
        { path: "admin", element: <Homepage /> },
        { path: "explore", element: <Explore></Explore> },
        { path: "postDetail/:post_id", element:<Detail></Detail>},
        { path:"your-advertise", element:<Youradvertise></Youradvertise>},
        { path:"booking-history",element:<BookingHistory></BookingHistory>},
        { path:"payment-history",element:<PaymentHistory></PaymentHistory>},
      ],
    },
    {
      element: <HomepageLayout/>,
      children: [{element: <Homepage />, index:true,}]
    },
  ]);

  return routes;
}
