"use client";

import useApi from "@/hooks/useApi";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginInputs, loginSchema } from "@/schemas/authSchema";
import { API_ENDPOINTS } from "@/config/apiConfig";
import { useUser } from "@/context/UserContext";
import Button from "@/components/atomic/button/Button";
import { useRouter } from "next/router";

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
  const { request, isFetching } = useApi();
  const { login } = useUser();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (data: loginInputs) => {
    setError("");
    console.log(data);
    const request_data = { username: data.phone, password: data.password };
    const response = await request({
      API_ENDPOINT: API_ENDPOINTS.LOGIN,
      method: "POST",
      data: request_data,
      redirect: false,
    });
    if (!response.ok) {
      setError(
        response.data?.message || "Phone number or password is incorrect"
      );
      return;
    } else {
      login(response.data?.access, response.data.refresh);
      router.push("/");
    }
  };

  return (
    <div
      className={`flex flex-col md:flex-row h-[calc(100vh-65px)] p-4 bg-white ${geistSans.variable} ${geistMono.variable}`}
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
        {/* Left Side */}
        <div className="flex items-center justify-center p-2 bg-white mt-10">
          <div className="max-w-lg w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-purple-900 to-indigo-500 inline-block text-transparent bg-clip-text">
                PureLink
              </span>
            </h2>
            <p className="text-gray-500 mb-6">Please enter your details</p>

            <p className="text-red-500 text-sm mb-4">{error}</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  aria-label="Enter your phone number"
                  className="w-full p-3 border text-black rounded-md focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your Phone Number"
                  {...register("phone")}
                />
                <p className="text-red-500 text-sm mb-4 mt-2">
                  {errors.phone?.message}
                </p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  aria-label="Enter your password"
                  className="w-full p-3 border text-black rounded-md focus:ring-2 focus:ring-purple-500"
                  placeholder="********"
                  {...register("password")}
                />
                <p className="text-red-500 text-sm mb-4">
                  {errors.password?.message}
                </p>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <label className="flex items-center cursor-pointer max-sm:text-[0.7rem]">
                  <input type="checkbox" className="mr-2" />
                  Remember for 30 days
                </label>
                <a
                  href="#"
                  className="text-purple-600 font-semibold max-sm:text-[0.7rem]"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 text-white p-3 rounded-md font-semibold hover:bg-purple-700 transition duration-300"
                isLoading={isFetching}
              >
                Sign in
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-purple-600 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex md:w-1/2 bg-purple-600 items-center justify-center relative overflow-hidden rounded-3xl min-h-[43.75rem]">
        <Image
          src="/images/signin/image.png"
          alt="Blood Donation"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full min-h-[43.75rem]"
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
