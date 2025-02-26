"use client";
import React, { useState, Fragment, useEffect } from "react";
import {
  FiLogOut,
  FiEdit,
  FiX,
  FiChevronRight,
  FiSearch,
} from "react-icons/fi";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import {
  User,
  TakeABreakDetails,
  DonationHistory,
} from "../../../interfaces/interface";
import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { menuItems } from "@/lib/menu/menuItems";
import Link from "next/link";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "profile" | "Profile" | "donationHistory" | "takeABreak"
  >("profile");

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

  const [userProfile, setUserProfile] = useState<User>({
    avatar: "/images/profile.png",
    id: 1234567,
    name: "Damien Smith",
    bloodGroup: "AB+",
    phoneNumber: "9876543212",
    district: "Ernakulam",
    address: "258 Quigley Parkways, Elisabethland, Trinidad and Tobago 55212",
  });

  const [originalProfile, setOriginalProfile] = useState<User>({
    ...userProfile,
  });

  const [donationHistory] = useState<DonationHistory[]>([
    {
      date: "31/01/2024",
      units: 1,
      recipient: "Aubrey",
      bloodType: "WPC",
    },
    {
      date: "20/12/2023",
      units: 2,
      recipient: "Sam",
      bloodType: "RBC",
    },
  ]);

  const [takeABreakDetails, setTakeABreakDetails] = useState<TakeABreakDetails>(
    {
      fromDate: null,
      toDate: null,
      reason: "",
    }
  );

  // Handlers
  const handleUserProfileChange = (field: keyof User, value: string) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const saveUserProfile = () => {
    setOriginalProfile({ ...userProfile });
    setActiveTab("Profile");
  };

  const discardChanges = () => {
    setUserProfile({ ...originalProfile });
    setActiveTab("Profile");
  };

  const handleTakeABreakChange = (
    field: keyof TakeABreakDetails,
    value: string | Date | null
  ) => {
    setTakeABreakDetails((prev) => ({ ...prev, [field]: value }));
  };

  const submitTakeABreak = () => {
    if (
      !takeABreakDetails.fromDate ||
      !takeABreakDetails.toDate ||
      !takeABreakDetails.reason
    ) {
      alert("All fields are required for submitting a break.");
      return;
    }
    alert("Take a break request submitted successfully.");
    setTakeABreakDetails({ fromDate: null, toDate: null, reason: "" });
    setActiveTab("profile");
  };

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
                src={userProfile?.avatar}
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
            className="fixed top-0 right-0 w-full bg-white p-4 shadow-md rounded-bl-3xl rounded-br-3xl overflow-y-auto h-full max-h-56"
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
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 right-0 bg-gray-50 p-4 shadow-lg w-full h-full max-w-xs min-h-screen z-[2000] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-base font-medium capitalize">
                {activeTab.replace(/([A-Z])/g, " $1")}
              </h1>
              {activeTab === "profile" ? (
                <button onClick={() => setIsDropdownOpen(false)}>
                  <FiX className="w-4 h-4 block hover:text-indigo-600 transition" />
                </button>
              ) : (
                <button onClick={() => setActiveTab("profile")}>
                  <FiX className="w-4 h-4 block hover:text-indigo-600 transition" />
                </button>
              )}
            </div>
            {activeTab === "profile" && (
              <motion.div key="profile">
                {
                  <div>
                    <div className="bg-white rounded-2xl border border-solid border-gray-200 p-4 w-full h-full mb-4">
                      <div className="flex items-center flex-col justify-center mb-5">
                        <div className="w-10 h-10 block mb-1">
                          <Image
                            src={userProfile?.avatar}
                            alt="Profile"
                            className="w-full h-full block object-cover rounded-[50%]"
                            width={10}
                            height={10}
                          />
                        </div>
                        <h2 className="text-sm font-medium mb-1">
                          {userProfile?.name}
                        </h2>
                        <p className="text-xs text-gray-500 font-medium mb-3">
                          #{userProfile?.id}
                        </p>
                        <button
                          onClick={() => setActiveTab("Profile")}
                          className="flex items-center gap-2 text-gray-600 font-normal border border-solid border-gray-100 py-1 px-4 rounded-3xl hover:border-gray-200 transition"
                        >
                          <span className="text-sm">Edit</span>
                          <FiEdit className="block" />
                        </button>
                      </div>
                      <div className="flex flex-col gap-3">
                        <p className="text-sm">
                          <span className="text-gray-500">Blood Group</span>{" "}
                          <br />
                          <span className="font-medium">
                            {userProfile?.bloodGroup}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Phone Number</span>{" "}
                          <br />
                          <span className="font-medium">
                            {userProfile?.phoneNumber}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">District</span> <br />
                          <span className="font-medium">
                            {userProfile?.district}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Address</span> <br />
                          <span className="font-medium">
                            {userProfile?.address}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <button
                        className="flex items-center justify-between text-sm"
                        onClick={() => setActiveTab("donationHistory")}
                      >
                        <span className="font-medium">Donation History</span>
                        <FiChevronRight className="w-4 h-4 block" />
                      </button>
                      <button
                        className="flex items-center justify-between text-sm"
                        onClick={() => setActiveTab("takeABreak")}
                      >
                        <span className="font-medium">Take a Break</span>
                        <FiChevronRight className="w-4 h-4 block" />
                      </button>
                    </div>
                  </div>
                }
              </motion.div>
            )}

            {activeTab === "Profile" && (
              <motion.div key="Profile">
                <div className="bg-white border border-solid border-gray-200 p-4 rounded-2xl w-full h-full">
                  <div className="flex items-center flex-col justify-center mb-5">
                    <div className="w-10 h-10 block mb-1">
                      <Image
                        src={userProfile?.avatar}
                        alt="Profile"
                        className="w-full h-full block object-cover rounded-[50%]"
                        width={10}
                        height={10}
                      />
                    </div>
                    <h2 className="text-sm font-medium mb-1">
                      {userProfile?.name}
                    </h2>
                    <p className="text-xs text-gray-500 font-medium mb-3">
                      #{userProfile?.id}
                    </p>
                  </div>
                  <div className="mb-5 flex flex-col gap-3">
                    <div className="text-sm">
                      <p className="text-gray-500">Blood Group</p>
                      <input
                        type="text"
                        value={userProfile.bloodGroup}
                        onChange={(e) =>
                          handleUserProfileChange("bloodGroup", e.target.value)
                        }
                        className="outline-none focus:border-gray-300 mt-1 p-2 rounded-lg border border-solid border-gray-200 font-normal w-full h-full"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-500">Phone Number</p>
                      <input
                        type="text"
                        value={userProfile.phoneNumber}
                        onChange={(e) =>
                          handleUserProfileChange("phoneNumber", e.target.value)
                        }
                        className="outline-none focus:border-gray-300 mt-1 p-2 rounded-lg border border-solid border-gray-200 font-normal w-full h-full"
                        maxLength={14}
                      />
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-500">District</p>
                      <input
                        type="text"
                        value={userProfile.district}
                        onChange={(e) =>
                          handleUserProfileChange("district", e.target.value)
                        }
                        className="outline-none focus:border-gray-300 mt-1 p-2 rounded-lg border border-solid border-gray-200 font-normal w-full h-full"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-500">Address</p>
                      <textarea
                        value={userProfile.address}
                        onChange={(e) =>
                          handleUserProfileChange("address", e.target.value)
                        }
                        className="outline-none focus:border-gray-300 mt-1 p-2 rounded-lg border border-solid border-gray-200 font-normal w-full h-full min-h-24"
                        maxLength={75}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <button
                      onClick={discardChanges}
                      className="text-sm border border-gray-200 border-solid w-full p-2 rounded-lg hover:border-gray-300 transition"
                    >
                      Discard
                    </button>
                    <button
                      onClick={saveUserProfile}
                      className="text-sm w-full p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "donationHistory" && (
              <motion.div key="donationHistory">
                {donationHistory.length > 0 ? (
                  <div className="">
                    {donationHistory.map((donation, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 border-solid rounded-2xl py-3 px-4 w-full h-full grid grid-cols-2 gap-3 mb-4"
                      >
                        <p className="text-sm text-gray-500">
                          Date <br />
                          <span className="text-black font-medium">
                            {donation.date}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Recipient <br />
                          <span className="text-black font-medium">
                            {donation.recipient}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Units <br />
                          <span className="text-black font-medium">
                            {donation.units}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Blood Type <br />
                          <span className="text-black font-medium">
                            {donation.bloodType}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="flex items-center justify-center text-gray-500 text-sm">
                    No donation history available.
                  </p>
                )}
              </motion.div>
            )}

            {activeTab === "takeABreak" && (
              <motion.div
                key="takeABreak"
                className="bg-white p-4 rounded-2xl border border-solid border-gray-200"
              >
                <div className="flex items-center justify-between gap-12 mb-4 w-full h-full">
                  <div className="w-full h-full block">
                    <p className="text-sm mb-2">From</p>
                    <div className="w-full h-full border border-solid border-gray-300 rounded-lg flex items-center">
                      <CalendarDays className="w-12 h-7 px-[0.35rem] pointer-events-none" />
                      <DatePicker
                        selected={takeABreakDetails.fromDate}
                        onChange={(date) =>
                          handleTakeABreakChange("fromDate", date)
                        }
                        dateFormat="dd/MM/yyyy"
                        popperPlacement="bottom-start"
                        className="w-full h-full block outline-none text-xs bg-transparent"
                      />
                    </div>
                  </div>
                  <div className="w-full h-full block">
                    <p className="text-sm mb-2">To</p>
                    <div className="w-full h-full border border-solid border-gray-300 rounded-lg flex items-center">
                      <CalendarDays className="w-12 h-7 px-[0.35rem] pointer-events-none" />
                      <DatePicker
                        selected={takeABreakDetails.toDate}
                        onChange={(date) =>
                          handleTakeABreakChange("toDate", date)
                        }
                        dateFormat="dd/MM/yyyy"
                        popperPlacement="bottom-start"
                        className="w-full h-full block outline-none text-xs bg-transparent"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm mb-2">Reason</p>
                  <textarea
                    value={takeABreakDetails.reason}
                    onChange={(e) =>
                      handleTakeABreakChange("reason", e.target.value)
                    }
                    className="w-full h-24 p-3 rounded-xl border border-solid border-gray-300 text-sm outline-none"
                    maxLength={125}
                  />
                </div>
                <button
                  onClick={submitTakeABreak}
                  className="w-full h-full bg-indigo-600 text-white text-sm p-2 rounded-[0.5rem] text-center hover:bg-indigo-500 transition"
                >
                  Submit
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Navbar;
