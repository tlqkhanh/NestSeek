import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiThMenu } from 'react-icons/ti'; 
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import AdminCard from "./Header/AdminCard";
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Header = ({ isLoggedIn, userType }) => {
  const renderUserOptions = () => {

    if (isLoggedIn) {
      if (userType === 'admin') {
        return (
          <AdminCard></AdminCard>
          
        );
      }
      else {
        return (
          <AdminCard></AdminCard>
        );
      }
    }
    return null;
  };
  const customstyle=
  {
    addborder:
    {
      padding: '5px 20px 5px 20px',
      marginLeft: '15px',
    },
    header:
    {
      margin:'20px 40px',
    },
  };
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className="flex justify-end">
      <header style={customstyle.header}>
        <nav className="hidden md:block">
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
                <div className="options">
                  {renderUserOptions()}
                </div>
              </li>
            ) : (
              <>
                <li>
                  <button className="border border-darkblue hover:bg-medium hover:text-white hover:border-white bg-white text-darkblue font-bold py-2 px-4 rounded" style={customstyle.addborder}>
                    <Link to="/sign-up">Sign Up</Link>
                  </button>
                </li>
                <li>
                  <button className="border border-darkblue hover:bg-medium hover:border-white hover:text-white bg-white text-darkblue font-bold py-2 px-4 rounded" style={customstyle.addborder}>
                    <Link to="/log-in">Log In</Link>
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="md:hidden flex flex-row">
        <Menu as="div" className="relative inline-block text-left ">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
            <TiThMenu className="text-2xl text-blue2" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-blue2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
             {!isLoggedIn ? (<div className="py-1">
              <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-white',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Sign Up
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-white',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Log In
                    </a>
                  )}
                </Menu.Item>
              </div>):(<div></div>)}
              <div className="py-1">
              
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/about-us"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-white',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      About us
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/explore"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-white',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Explore
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/advertise"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-white',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Advertise
                    </a>
                  )}
                </Menu.Item>
                
              </div>
            </Menu.Items>
          </Transition>
          

        </Menu>
        <div>
          {isLoggedIn ? (renderUserOptions()):(<div></div>)}
        </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
