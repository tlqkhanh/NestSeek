import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

//demo import action
import login from "../action/tempAction.js";

export default function Header(){
    return (
        <header>
            This is the header.
        </header>
    )



}