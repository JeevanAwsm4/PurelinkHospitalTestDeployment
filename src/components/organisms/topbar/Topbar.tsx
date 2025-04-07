import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import useApi from "@/hooks/useApi";
import { API_ENDPOINTS } from "@/config/apiConfig";
import { User } from "../../../interfaces/interface";

const TopBar = () => {
  const { isLogged, userData } = useUser();
  const { request } = useApi();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentDate] = useState<string>(() => {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  });

  useEffect(() => {
    const fetchImage = async () => {
      if (!userData?.accessToken) return;

      const res = await request({
        API_ENDPOINT: API_ENDPOINTS.GET_PFP,
        method: "POST",
        token: userData.accessToken,
      });

      console.log(res);

      if (res.status_code === 6000) {
        setUserProfile((prev) => ({
          ...prev,
          avatar: res.data.image_url,
        }));
      } else {
        console.error("Failed to fetch image", res.data);
      }
    };

    fetchImage();
  }, [userData, request]); // Add missing dependency

  const [userProfile, setUserProfile] = useState<User>({
    avatar: "/images/profile.png",
    id: 1234567,
    name: "Damien Smith",
    bloodGroup: "AB+",
    phoneNumber: "9876543212",
    district: "Ernakulam",
    address: "258 Quigley Parkways, Elisabethland, Trinidad and Tobago 55212",
  });

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !userData?.accessToken) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userData.accessToken}`,
        // DO NOT set 'Content-Type' manually here!
      },
      body: formData,
    });

    const resData = await res.json();
    console.log(resData);

    if (res.ok) {
      const updatedImage = resData.image;
      setUserProfile((prev) => ({
        ...prev,
        avatar: updatedImage,
      }));
    } else {
      console.error("Image upload failed", resData.image || resData);
    }
  };

  if (!isLogged) return <></>;

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
            <div
              className="w-10 h-10 block cursor-pointer"
              onClick={handleImageClick}
            >
              <Image
                src={userProfile.avatar}
                alt="Profile"
                className="w-full h-full block object-cover rounded-[50%] border border-solid border-gray-200"
                width={40}
                height={40}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                title="Upload profile image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
