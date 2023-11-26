import classNames from "classnames";
import {
  BsFacebook,
  BsFillCartCheckFill,
  BsFillTelephoneFill,
  BsInstagram,
  BsYoutube,
} from "react-icons/bs";
import { Link } from "react-router-dom";
// import "./styles/Footer.css";

export default function Footer() {
  return (
    <div className={classNames("bg-medium text-white w-full")}>
        <div
          className={classNames(
            "flex flex-col md:flex-row md:items-center justify-between py-3 border-b border-white"
          )}
        >
          <div>
            <h3
              className={classNames(
                "text-white py-2 px-5 text-xl font-semibold leading-28 tracking-wide capitalize"
              )}
            >
              NEST SEEK
            </h3>
          </div>
          <div className={classNames("text-zinc-300 text-base leading-6")}>
            <ul
              className={classNames("flex flex-col md:flex-row-reverse gap-6 px-5")}
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={classNames("py-3 flex items-center justify-between")}>
          <div>
            <p
              className={classNames(
                "text-white text-center text-base leading-6 px-5"
              )}
            >
              High level experience in web design and development knowledge, producing quality work.
            </p>
          </div>
          <div
            className={classNames(
              "text-white text-base font-semibold leading-6"
            )}
          >
            <ul className={classNames("flex justify-evenly gap-6 px-5")}>
              <Link to="/">
                <BsFacebook />
              </Link>
              <Link to="/">
                <BsInstagram />
              </Link>
              <Link to="/">
                <BsYoutube />
              </Link>
              <Link to="/">
                <BsFillCartCheckFill />
              </Link>
              <Link to="/">
                <BsFillTelephoneFill />
              </Link>
            </ul>
          </div>
        </div>
    </div>
  );
}
