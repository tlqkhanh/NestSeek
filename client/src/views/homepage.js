import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import img1 from "../assets/homepage.jpg";
// import img2 from "../assets/homepage2.png";
// import img3 from "../assets/homepage3.png";
import img4 from "../assets/homepage4.png";
import { Link } from "react-router-dom";
export default function Homepage() {
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
    
    const custom=
    {
        title:
        {
            fontSize:"200%",
            fontWeight:"bold",
        },
        addborder:
        {
          border: '1px solid #013034',
          padding: '10px 30px 10px 30px',
          backgroundColor:"#013034",
          color:"white"
        },
        }
    return (
        <main className="flex" style={{marginBottom:"0px"}}>
            <div className="w-1/2 overflow-hidden max-w-[100vw]">
            <Slider {...settings}>
                <div className="slider-container">
                    <img src={img4} alt="Homepage" className="h-full w-full" />
                </div>            
                <div className="slider-container">
                    <img src={img4} alt="Homepage" className="h-full w-full" />
                </div>                 <div className="slider-container">
                    <img src={img4} alt="Homepage" className="h-full w-full" />
                </div>                 <div className="slider-container">
                    <img src={img4} alt="Homepage" className="h-full w-full" />
                </div> 
            </Slider>
            </div>
            <div className="w-1/2">
                <div className="items-center justify-center text-#0E494E m-20">
                    <h1 style={custom.title}>Your Comfort</h1>
                    <h1 style={custom.title}>Our Priority</h1>
                    <br></br>
                    <p>Discover Comfortable Spaces for Every Stay - Your Ideal Home or Business Location Awaits !</p>
                    <br></br>
                    <br></br>
                    <button className="border-15 border-#013034 bg-white text-#013034 font-bold py-2 px-4 rounded addborder" style={custom.addborder}>
                    <Link to="/login">Rent now</Link>
                  </button>
                </div>
            </div>
            <style>{customCSS}</style>
        </main>
    )
}