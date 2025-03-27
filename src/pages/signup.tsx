"use client";

import Button from "@/components/atomic/button/Button";
import { API_ENDPOINTS } from "@/config/apiConfig";
import useApi from "@/hooks/useApi";
import { registerInputs, registerSchema } from "@/schemas/authSchema";
import { keralaDistricts } from "@/utils/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Login() {
  const router = useRouter();
  const { isFetching, request } = useApi();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: registerInputs) => {
    setError("");
    console.log(data);
    const request_data = { ...data };
    const response = await request({
      API_ENDPOINT: API_ENDPOINTS.HOSPITAL_REGISTER,
      method: "POST",
      data: request_data,
      redirect: false,
    });
    console.log(response);
    if (!response.ok) {
      setError(
        response.data?.message || "Phone number or password is incorrect"
      );
      return;
    } else {
      router.push("/signin");  
    }
  };

  return (
    <div
      className={`flex flex-col md:flex-row h-[calc(100vh-65px)] p-4 bg-white ${geistSans.variable} ${geistMono.variable} gap-2`}
    >
      <div className="w-full md:w-3/6 ">
        <div className="flex md:ml-4 mb-4 md:mb-0">
          <Image
            alt="Logo"
            className="w-40 h-20  md:w-15 md:h-15 lg:w-40 lg:h-20"
            src="/images/signin/Group.svg"
            width={1000}
            height={1000}
          />
        </div>
        <div className="self-center md:mt-10">
          <div className="max-w-lg w-full mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-purple-900 to-indigo-500 inline-block text-transparent bg-clip-text">
                PureLink Hospital
              </span>
              Dashboard
            </h2>
            <p className="text-gray-500 mb-6">Please enter your details</p>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium"
                  htmlFor="phone"
                >
                  User Name
                </label>
                <input
                  type="text"
                  id="phone"
                  aria-label="Enter your user name"
                  className="w-full p-3 border text-black rounded-md focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your user name"
                  {...register("username")}
                />
                <p className="text-red-500 text-sm mb-2 mt-1">
                  {errors.username?.message}
                </p>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium"
                  htmlFor="password"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  aria-label="Enter your email"
                  className="w-full p-3 border text-black rounded-md focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                  {...register("email")}
                />
                <p className="text-red-500 text-sm mb-2 mt-1">
                  {errors.email?.message}
                </p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium"
                  htmlFor="password"
                >
                  Create Password
                </label>
                <input
                  type="password"
                  id="password"
                  aria-label="Enter a password"
                  className="w-full p-3 border text-black rounded-md focus:ring-2 focus:ring-purple-500"
                  placeholder="********"
                  {...register("password")}
                />
                <p className="text-red-500 text-sm mb-2 mt-1">
                  {errors.password?.message}
                </p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  aria-label="Add your address"
                  className="w-full p-3 border text-black rounded-md focus:ring-2 focus:ring-purple-500"
                  placeholder="Add your address"
                  {...register("address")}
                />
                <p className="text-red-500 text-sm mb-2 mt-1">
                  {errors.address?.message}
                </p>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium"
                  htmlFor="address"
                >
                  phone Number
                </label>
                <input
                  type="text"
                  id="number"
                  aria-label="Enter phone number"
                  className="w-full p-3 border text-black rounded-md focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter phone number"
                  {...register("phone_no")}
                />
                <p className="text-red-500 text-sm mb-2 mt-1">
                  {errors.phone_no?.message}
                </p>
              </div>

              <div className="mb-4">
                <label className="block">
                  Select District:
                  <select
                    {...register("district")}
                    className="border w-full bg-white p-3"
                  >
                    <option value="" className="text-gray-700 font-medium">
                      Choose...
                    </option>
                    {keralaDistricts.map((district) => (
                      <option
                        className="text-gray-700 font-medium"
                        key={district}
                        value={district}
                      >
                        {district}
                      </option>
                    ))}
                  </select>
                </label>
                <p className="text-red-500 text-sm mb-2 mt-1">
                  {errors.district?.message}
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 text-white p-3 rounded-md font-semibold hover:bg-purple-700 transition duration-300"
                isLoading={isFetching}
              >
                Sign up
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex md:w-1/2 bg-purple-600 items-center justify-center relative overflow-hidden rounded-3xl min-h-[53rem] ">
        <Image
          src="/images/signin/image.png"
          alt="Blood Donation"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full min-h-[53rem]"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-600 to-transparent p-8 md:p-16 rounded-r-lg">
          <p className="text-white text-xl md:text-4xl font-semibold">
            {`“The life you save through blood donation may be a stranger's, but
            the gratitude will be universal”`}
          </p>
          <p className="text-white mt-2 font-bold">__ __ __</p>
        </div>
      </div>
    </div>
  );
}
