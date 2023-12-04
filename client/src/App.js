import React from "react";
// import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
// import { BrowserRouter, Routes, Route} from "react-router-dom";
// import './App.css';
// import Header from './components/header';
// import Footer from "./components/footer";
// import Homepage from "./views/homepage";
// import AboutUs from "./views/AboutUs";
// import UserAppLayout from "./components/Layout/UserAppLayout";
import Router from "./components/Routes/Router";
import { BrowserRouter} from "react-router-dom";

function App() {
  return (
    // <BrowserRouter>
    //   <div className="container">
    //     <Header/>
    //     <Routes>
    //       <Route path="/">
    //         <Route index element={<Homepage />} />
    //         <Route path='about-us' element={<AboutUs/>}/>
    //         <Route path='admin' element={<admin />}></Route>
    //         <Route path='explore'>
    //           <Route index element={<Explore />}/>
    //           <Route path='postDetail/:post_id'></Route>
    //         </Route>
    //         <Route path='my'>
    //           <Route index element={<Homepage />}/>
    //         </Route>
    //       </Route>
    //     </Routes>
    //     <Footer/>
    //   </div>
    // </BrowserRouter>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
