import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../assets/homepage.jpg";
import img2 from "../assets/homepage2.png";
import img3 from "../assets/homepage3.png";
import img4 from "../assets/homepage4.png";
import Header from '../components/header';
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
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1200,
        
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
          border: '1px',
          padding: '10px 30px 10px 30px',

        },
        }
    return (
        <div className="flex" style={{marginBottom:"0px"}}>
            <div className="w-1/2 overflow-hidden max-w-[50vw] hidden lg:block">
            <Slider {...settings}>
                <div>
                    <img src={img1} alt="Homepage" className="h-screen w-full object-cover" />
                </div>
               
                <div>
                    <img src={img3} alt="Homepage" className="h-screen w-full object-cover" />
                </div>
                <div>
                    <img src={img2} alt="Homepage" className="h-screen w-full object-cover" />
                </div>
                <div>
                    <img src={img4} alt="Homepage" className="h-screen w-full object-cover" />
                </div>
            </Slider>
            </div>
            <div className="w-1/2 hidden lg:block">
                <Header />
                <div className="items-center justify-center text-blue1 m-20 pt-20">
                    <h1 style={custom.title}>Your Comfort</h1>
                    <h1 style={custom.title}>Our Priority</h1>
                    <br></br>
                    <p>Discover Comfortable Spaces for Every Stay - Your Ideal Home or Business Location Awaits !</p>
                    <br></br>
                    <br></br>
                    <button className="border hover:bg-medium text-white bg-blue1 font-bold py-2 px-4 rounded addborder" style={custom.addborder}>
                    <Link to="/login">Rent now</Link>
                  </button>
                </div>
            </div>
            <div className="flex flex-col justify-center lg:hidden">
            <Header />
            <div className="w-full overflow-hidden max-w-[100vw] lg:hidden">
            <Slider {...settings}>
                <div>
                    <img src={img1} alt="Homepage" className="h-full w-full object-cover" />
                </div>
               
                <div>
                    <img src={img3} alt="Homepage" className="h-full w-full object-cover" />
                </div>
                <div>
                    <img src={img2} alt="Homepage" className="h-full w-full object-cover" />
                </div>
                <div>
                    <img src={img4} alt="Homepage" className="h-full w-full object-cover" />
                </div>
            </Slider>
            </div>
            <div className="items-center justify-center text-blue1 m-20">
                    <h1 style={custom.title}>Your Comfort</h1>
                    <h1 style={custom.title}>Our Priority</h1>
                    <br></br>
                    <p>Discover Comfortable Spaces for Every Stay - Your Ideal Home or Business Location Awaits !</p>
                    <br></br>
                    <br></br>
                    <button className="border hover:bg-medium text-white bg-blue1 font-bold py-2 px-4 rounded addborder" style={custom.addborder}>
                    <Link to="/login">Rent now</Link>
                  </button>
                </div>
            </div>
            <style>{customCSS}</style>
        </div>
    )
}
