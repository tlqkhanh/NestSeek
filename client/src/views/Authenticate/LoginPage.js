import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/homepage.jpg";
import img2 from "../../assets/homepage2.png";
import img3 from "../../assets/homepage3.png";
import img4 from "../../assets/homepage4.png";
import Header from '../../components/header';
import Login from "./Login";
export default function LoginPage({ setToken }) {
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
        <main className="flex h-fit w-full" style={{marginBottom:"0px"}}>
            <div className="w-1/2 overflow-hidden max-w-[50vw]">
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
            <div className="w-1/2">
                <Header />
                <div className="items-center justify-center text-#0E494E m-20">
                    <Login setToken={setToken}/>
                </div>
            </div>
            <style>{customCSS}</style>
        </main>
    )
}
