import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { UserIcon } from "@heroicons/react/24/outline";
import Cookies from "universal-cookie";
import axios from "axios";

export default function UserCard() {
  const cookies = new Cookies();
  async function handleLogout(event){
    event.preventDefault();
    try {
      axios.post(`http://localhost:9000/server/api/auth/logout.php`,{
      },
      {
          withCredentials: true,
          headers: {
              "Content-Type": "application/json"
          }
      })
      .then(response=> {
          if (response.status>=200 && response.status<400){
              cookies.remove('uid');
              cookies.remove('type');
              cookies.remove('token');
              cookies.remove('username');
              alert(response.data.message);
              window.location.href = "/";
          }
      })
      .catch(err => {
          console.log("Error: ", err.response.data.message)
      })
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <Menu as="div" className="relative text-left px-2 w-full h-full flex">
      <div className="">
        <Menu.Button className="px-6 py-2 inline-flex w-full justify-center items-center rounded-full text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200">
          {/* <img
            className={classNames("w-10 h-10 rounded-full")}
            src="/src/assets/me_ava.jpg"
            alt="user photo"
          /> */}
          <UserIcon className="w-6 h-6"/>
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
        <Menu.Items className="absolute right-0 z-10 mt-12 w-56 origin-top-right rounded-md bg-blue2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/my/profile"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-white",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Your profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/my/booking-history"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-white",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Booking history
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/my/payment-history"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-white",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Payment history
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/my/my-advertise"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-white",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  My Advertise
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="#" onSubmit={handleLogout}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-white",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    Log out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
