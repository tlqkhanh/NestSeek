import React from "react";
import { Link } from "react-router-dom";

const HomepaheHeader = ({ isLoggedIn, userType }) => {
  const renderUserOptions = () => {
    if (isLoggedIn) {
      if (userType === 'user') {
        return (
          <button className="border-15 border-darkblue bg-white hover:text-white text-darkblue font-bold py-2 px-4 rounded">
            Manage User Account
          </button>
        );
      } else if (userType === 'admin') {
        return (
          <button className="border-15 border-darkblue bg-white hover:text-white text-darkblue font-bold py-2 px-4 rounded">
            Manage Admin Account
          </button>
        );
      }
    }
    return null;
  };
  const customstyle=
  {
    addborder:
    {
      border: '1px solid #013034',
      padding: '5px 20px 5px 20px',
      marginLeft: '15px',
    },
    header:
    {
      margin:'20px 40px',
    },
  };
  return (
    <div className="flex justify-end">
      <header style={customstyle.header}>
        <nav>
          <ul className="flex">
            <li>
              <button className="border-15 border-darkblue bg-white text-darkblue font-bold py-2 px-4 rounded">
                    <Link to="/about-us">About Us</Link>
              </button>
            </li>
            <li>
              <button className="border-15 border-darkblue bg-white text-darkblue font-bold py-2 px-4 rounded">
                    <Link to="/explore">Explore</Link>
              </button>
            </li>
            <li>
              <button className="border-15 border-darkblue bg-white text-darkblue font-bold py-2 px-4 rounded">
                    <Link to="/explore">Advertise</Link>
              </button>
            </li>
            {isLoggedIn ? (
              <li>
                <button className="border-15 border-darkblue bg-white text-darkblue font-bold py-2 px-4 rounded">
                  Account
                </button>
                <div className="options">
                  {renderUserOptions()}
                </div>
              </li>
            ) : (
              <>
                <li>
                  <button className="border-15 border-darkblue hover:bg-medium hover:text-white bg-white text-darkblue font-bold py-2 px-4 rounded addborder" style={customstyle.addborder}>
                    <Link to="/signup">Sign Up</Link>
                  </button>
                </li>
                <li>
                  <button className="border-15 border-darkblue hover:bg-medium hover:text-white bg-white text-darkblue font-bold py-2 px-4 rounded addborder" style={customstyle.addborder}>
                    <Link to="/login">Log In</Link>
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default HomepaheHeader;
