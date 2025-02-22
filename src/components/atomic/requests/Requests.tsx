"use client";
import React, { useState } from "react";

export default function Requests() {
  const [isDateInput, setIsDateInput] = useState(false);
  const [date, setDate] = useState("");
  const commonClass =
    "w-full border text-[#697586] border-neutral-300 rounded-md p-2 ";

  const [isTimeInput, setIsTimeInput] = useState(false);
  const [time, setTime] = useState("");

  return (
    <div id="Section" className=" py-8">
      <div className="max-w-full  bg-white  rounded-lg p-6 md:p-8 mx-auto">
        <h2 className="text-[20px] font-sans font-[500] font-title text-gray-900 ">
          Request Form
        </h2>
        <p className="font-[400] text-[14px] font-sans mt-1 text-gray-500">
          Signed in as <span className="text-blue-600"> Medicity Kollam</span>
        </p>
        <form className="grid grid-cols-1 mt-9 md:grid-cols-2 gap-6">
          <div className="">
            <label className="block text-[14px] font-sans text-gray-900 font-[400] mb-2 ">
              Donation Type
            </label>
            <select
              id="bloodType"
              className="w-full border text-[#697586] border-neutral-300 rounded-md p-2"
            >
              <option>Select Type</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div className="">
            <label className="block text-[14px] font-sans text-gray-900 font-[400] mb-2 ">
              Blood Group
            </label>
            <select
              id="bloodType"
              className="w-full border text-[#697586] border-neutral-300 rounded-md p-2"
            >
              <option>Select Group</option>
              <option>1</option>
              <option>2</option>
              <option>1</option>
            </select>
          </div>
          <div>
            <label className="block text-[14px] font-sans text-gray-900 font-[400] mb-2">
              Date
            </label>
            {isDateInput ? (
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onBlur={(e) => {
                  if (!e.target.value) setIsDateInput(false); // Revert if no date selected
                }}
                className={`${commonClass} `} // Add `date-input` class dynamically
                autoFocus
              />
            ) : (
              <select
                onClick={() => setIsDateInput(true)}
                className={commonClass}
              >
                <option value=""> Date</option>
              </select>
            )}
          </div>
          <div>
            <label className="block text-[14px] font-sans text-gray-900 font-[400] mb-2">
              Time
            </label>
            {isTimeInput ? (
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                onBlur={(e) => {
                  if (!e.target.value) setIsTimeInput(false); // Revert if no time is selected
                }}
                className={`${commonClass} time-input`} // Add `time-input` class dynamically
                autoFocus
              />
            ) : (
              <select
                onClick={() => setIsTimeInput(true)}
                className={commonClass}
              >
                <option value=""> Time</option>
              </select>
            )}
          </div>
          <div className="">
            <label
              htmlFor="password"
              className="block text-[14px] font-sans text-gray-900 font-[400] mb-2 "
            >
              Enter Password
            </label>
            <input
              type="text"
              id="password"
              placeholder="Enter Password"
              className="w-full border border-neutral-300 rounded-[8px] p-2"
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-wrap justify-end">
            <div className="w-full ml-1 flex flex-row justify-start sm:items-center items-center gap-2">
              <input type="checkbox" className="mb-2 sm:mb-0 sm:mr-3" />
              <p className="text-gray-500 text-[14px] text-center sm:text-left max-sm:text-[0.8rem]">
                I have read & I agree to the Terms and Conditions
              </p>
            </div>

            <button
              type="submit"
              className="bg-black text-white rounded-[8px] px-6 py-2 hover:bg-neutral-800 mt-6"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
