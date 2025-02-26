"use client";
import React, { useState, Fragment, useEffect } from "react";
import {
  FiLogOut,
  FiX,
  FiSearch,
} from "react-icons/fi";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/solid";

import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { menuItems } from "@/lib/menu/menuItems";
import Link from "next/link";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
 

  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);
  const [currentDate] = useState<string>(() => {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  });

 

  return (
    <>
      <div className="lg:block hidden fixed left-0 top-0 bottom-0 z-50">
        <div className="sticky h-full min-h-screen py-4 px-0 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-end cursor-pointer pt-4 pl-8 pb-8 pr-6 gap-1">
              <div className="w-7 h-7 block">
                <Image
                  className="w-full h-full block"
                  src="/images/logo.svg"
                  alt="PureLink"
                  width={10}
                  height={10}
                />
              </div>
              <div>
                <h1 className="text-lg italic font-bold">
                  Pure<span className="text-indigo-600">Link</span>
                </h1>
              </div>
            </div>
            <ul className="flex-1">
              {menuItems.map((item, index) => (
                <li key={index} className="mb-1">
                  <Link
                    href={item.path}
                    className={`relative flex py-3 px-6 items-center text-sm ml-3 gap-5 text-center text-gray-950 rounded-md transition-all duration-300 hover:bg-indigo-50 hover:text-gray-950 ${
                      router.pathname === item.path
                        ? "bg-indigo-600 text-white before:content-[''] before:absolute before:-left-3 before:top-0 before:h-full before:w-1 before:bg-indigo-600 before:rounded-md hover:bg-indigo-600 hover:text-white"
                        : ""
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <button
              className="flex py-3 px-6 items-center text-sm ml-3 gap-5 text-center text-gray-950 rounded-md transition-all duration-300 hover:bg-indigo-50 hover:text-gray-950 "
              onClick={() => {
                router.push("/signin");
              }}
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      {/* Responsive Design(width: 1024px) */}
      <div className="lg:hidden block bg-gray-50  w-full top-0 right-0 p-2 fixed left-0  z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 block cursor-pointer">
              <Image
                src={"/images/profile.png"}
                alt="Profile"
                className="w-full h-full block object-cover rounded-[50%] border border-solid border-gray-200"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                width={10}
                height={10}
              />
            </div>
            <div className="text-start">
              <div className="text-[0.5rem] text-gray-600">{currentDate}</div>
              <div className="text-[0.7rem] font-semibold text-gray-700">
                Welcome to dashboard
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-none border-none outline-none cursor-pointer">
              <FiSearch className="text-gray-800 text-sm hover:text-indigo-600 transition-colors" />
            </button>
            <button onClick={() => setIsOpen(true)} className="w-6 h-6 block">
              <Bars3Icon className="w-full h-full block text-gray-800 hover:text-indigo-600 transition-colors" />
            </button>
          </div>
        </div>
        {/* Navbar Responsived */}
        {/* Overlay Effect */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300"
            onClick={() => setIsOpen(false)} // Close when clicking outside
          ></div>
        )}
        {/* Mobile Menu Drawer */}
        <Transition
          show={isOpen}
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 translate-y-[-100%]"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-[-100%]"
        >
          <Menu
            as="div"
            className="fixed top-0 right-0 w-full bg-white p-4 shadow-md rounded-bl-3xl rounded-br-3xl overflow-y-auto h-full max-h-64"
          >
            <div className="flex items-center justify-between mb-5">
              {/* Logo */}
              <div className="flex items-end cursor-pointer gap-1">
                <div className="w-6 h-6 block">
                  <Image
                    className="w-full h-full block"
                    src="/images/logo.svg"
                    alt="PureLink"
                    width={10}
                    height={10}
                  />
                </div>
                <div>
                  <h1 className="text-base italic font-bold">
                    Pure<span className="text-indigo-600">Link</span>
                  </h1>
                </div>
              </div>
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-5 h-5 block"
              >
                <FiX className="w-full h-full block text-gray-800 hover:text-indigo-600 transition-colors" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <ul className="flex-1">
              {menuItems.map((item, index) => (
                <li key={index} className="mb-2">
                  <Link
                    href={item.path}
                    className={`text-sm hover:text-indigo-600 transition-colors ${
                      router.pathname === item.path ? "text-indigo-600" : ""
                    }`}
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <hr className="w-full text-gray-300 mt-4 mb-6" />
            <div className="flex-auto">
              <Link
                href="/settings"
                className={`text-sm hover:text-indigo-600 transition-colors ${
                  router.pathname === "/settings" ? "text-indigo-600" : ""
                }`}
              >
                <span>Settings</span>
              </Link>{" "}
              <br />
              <button
                onClick={() => router.push("/signin")}
                className="text-sm hover:text-indigo-500 transition-colors mt-2"
              >
                <span>Logout</span>
              </button>
            </div>
          </Menu>
        </Transition>
        {/* Profile Sliding */}
      </div>
    </>
  );
};

export default Navbar;
