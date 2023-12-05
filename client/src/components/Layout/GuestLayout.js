import { Outlet } from "react-router-dom";
import Footer from "../footer";
import Header from "../header";

export default function GuestLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex">
        <Outlet/>
      </div>
      <Footer />
    </div>
  );
}
