import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { User } from "../../../interfaces/interface";

import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

const TopBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { isLogged } = useUser();
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

  useEffect(() => {
    setUserProfile({
      avatar: "/images/profile.png",
      id: 1234567,
      name: "Damien Smith",
      bloodGroup: "AB+",
      phoneNumber: "9876543212",
      district: "Ernakulam",
      address: "258 Quigley Parkways, Elisabethland, Trinidad and Tobago 55212",
    });
  }, []);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Search Query Submitted: ${searchQuery}`);
  };
  if (!isLogged) {
    return <></>;
  }

  return (
    <div className="lg:block hidden">
      <div className="">
        <div className="flex items-center justify-between flex-wrap bg-gray-50 sticky w-full h-full top-0 right-0 z-[1000]">
          <div className="text-start">
            <div className="text-xs text-gray-400 font-medium text-[1rem] leading-5 tracking-normal">
              {currentDate}
            </div>
            <div className="text-lg  text-gray-950 text-center font-medium text-[1.5rem] leading-8 tracking-normal">
              Welcome to dashboard
            </div>
          </div>

          <div className="flex items-center gap-5">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center gap-1 py-2 px-3 border border-solid border-gray-300 rounded-2xl bg-white flex-1 w-full"
            >
              <button
                type="submit"
                className="bg-none border-none outline-none cursor-pointer"
              >
                <FiSearch className="text-gray-400 text-sm" />
              </button>
              <input
                type="text"
                className="outline-none text-xs text-gray-900 w-80 placeholder:text-gray-400"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>

            <div className="w-10 h-10 block cursor-pointer">
              <Image
                src={userProfile?.avatar}
                alt="Profile"
                className="w-full h-full block object-cover rounded-[50%] border border-solid border-gray-200"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                width={10}
                height={10}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
