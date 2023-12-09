import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { UserIcon } from "@heroicons/react/24/outline";

export default function AdminCard() {
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
                  href="profile"
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
                  href="pending-post"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-white",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Pending
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="report-list"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-white",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Report
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-white",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    Sign out
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
