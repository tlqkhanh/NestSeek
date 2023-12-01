import { Outlet } from "react-router-dom";
// import Footer from "../footer";
// import Header from "../header";
import AdminHeader from "../Header/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader isLoggedIn= 'true' userType='admin'/>
      <div className="flex-grow flex">
        <Outlet/>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
