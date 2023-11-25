import { useRoutes } from "react-router-dom";
import UserAppLayout from "../Layout/UserAppLayout";
import AboutUs from "../../views/AboutUs/AboutUs";
import Homepage from "../../views/homepage";
import Report from "../../views/Report/ReportList";
import PendingPost from "../../views/Pending/PendingPost";

export default function Router() {
  const routes = useRoutes([
    {
      element: <UserAppLayout />,
          children: [
            { element: <Homepage />, index: true },
            { path: "about-us", element: <AboutUs /> },
            { path: "pending-post", element: <PendingPost />},
            {path: "report-list", element: <Report/>},
            { path: "admin", element: <Homepage /> },
            { path: "postDetail/:post_id", element: '' },
          ],
    },
  ]);

  return routes;
}
