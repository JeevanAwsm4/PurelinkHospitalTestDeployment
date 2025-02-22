"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

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
      className={`flex flex-col md:flex-row h-[calc(100vh-65px)] p-4 bg-white ${geistSans.variable} ${geistMono.variable} relative`}
    >
      <div className="flex md:ml-4 mb-4 md:mb-0 absolute top-3 left-3">
        <Image
          alt="Logo"
          className="w-40 h-20  md:w-15 md:h-15 lg:w-40 lg:h-20"
          src="/images/signin/Group.svg"
          width={1000}
          height={1000}
        />
      </div>
      {/* Left Side */}
      <div className="w-full md:w-3/6 flex items-center justify-center p-2 bg-white mt-24 ">
        <div className="max-w-lg w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-purple-900 to-indigo-500 inline-block text-transparent bg-clip-text">
              PureLink Hospital
            </span>
            Dashboard
          </h2>
          <p className="text-gray-500 mb-6">Please enter your details</p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium"
                htmlFor="address"
              >
                District
              </label>
              <input
                type="text"
                id="number"
                aria-label="Enter your district"
                className="w-full p-3 border text-black rounded-md focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your district"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-md font-semibold hover:bg-purple-700 transition duration-300"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex md:w-1/2 bg-purple-600 items-center justify-center relative overflow-hidden rounded-3xl">
        <Image
          src="/images/signup/image.png"
          alt="Blood Donation"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full"
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
