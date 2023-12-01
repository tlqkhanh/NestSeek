import { Outlet } from "react-router-dom";
import Footer from "../footer";
// import HomepaheHeader from "./HomepageHeader";
// import Header from "../header";

export default function HomepageLayout() {
  return (
    <div className="flex flex-col h-screen">
      {/* <Header /> */}
      <div className="flex-grow flex">
        <Outlet/>
      </div>
      <Footer />
    </div>
  );
}
