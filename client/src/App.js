import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import Header from './components/header';
import Footer from "./components/footer";
import Homepage from "./views/homepage";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header></Header>
        <Routes>
          <Route path="/">
            <Route index element={<Homepage />} />
            <Route path='admin' element={<Homepage />}></Route>
            <Route path='explore'>
              <Route index element={<Homepage />}/>
              <Route path='postDetail/:post_id'></Route>
            </Route>
            <Route path='my'>
              <Route index element={<Homepage />}/>
            </Route>
          </Route>
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>
    
    
  );
}

export default App;
