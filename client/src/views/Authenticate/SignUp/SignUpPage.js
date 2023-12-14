import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../../assets/homepage.jpg";
import img2 from "../../../assets/homepage2.png";
import img3 from "../../../assets/homepage3.png";
import img4 from "../../../assets/homepage4.png";
import Header from '../../../components/header';
import SignUp from "./SignUp";
export default function SignUpPage({ setToken }) {
    const customCSS = `
    .slick-dots {
      position: absolute;
      bottom: 20px;
      width: 100%;
      z-index: 1;
      color:white;
    }

    .slick-dots li button:before {
      color: #fff;
      font-size: 10px;
    }
  `;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };
    
    return (
        <main className="flex justify-center h-fit w-full pb-4">
            <SignUp />
        </main>
    )
}
