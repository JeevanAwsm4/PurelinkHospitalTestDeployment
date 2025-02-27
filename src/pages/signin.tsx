"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaFacebook } from "react-icons/fa";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phone.match(/^\d{10}$/)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    alert("Login successful!");
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

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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

              <button
                type="submit"
                className="w-full bg-purple-600 text-white p-3 rounded-md font-semibold hover:bg-purple-700 transition duration-300"
              >
                Sign in
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-purple-600 font-semibold">
                Sign up
              </Link>
            </p>

            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              className="w-full flex items-center justify-center border p-3 rounded-md mb-2 bg-white shadow-md hover:bg-gray-100 transition duration-300"
              aria-label="Sign in with Google"
            >
              <Image
                src="/images/signin/google-icon.png"
                alt="Google Logo"
                width={24}
                height={24}
                className="mr-3"
              />
              <span className="font-medium text-gray-700">
                Sign in with Google
              </span>
            </button>

            <button
              className="w-full flex items-center justify-center border p-3 rounded-md bg-white shadow-md hover:bg-gray-100 transition duration-300"
              aria-label="Sign in with Facebook"
            >
              <FaFacebook className="mr-3 text-blue-600" size={24} />
              <span className="font-medium text-gray-700">
                Sign in with Facebook
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex md:w-1/2 bg-purple-600 items-center justify-center relative overflow-hidden rounded-3xl min-h-[700px]">
        <Image
          src="/images/signin/image.png"
          alt="Blood Donation"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full min-h-[700px]"
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
