"use client";
import { API_ENDPOINTS } from "@/config/apiConfig";
import { useUser } from "@/context/UserContext";
import useApi from "@/hooks/useApi";
import { IRequestFormInputs, requestSchema } from "@/schemas/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Button from "../button/Button";
import "@/styles/global.css";

export default function Requests() {ror] = useState("");
  const [error, setError] = useState("");
  const commonClass =    "w-full border text-[#697586] border-neutral-300 rounded-md p-2 ";
    "w-full border text-[#697586] border-neutral-300 rounded-md p-2 ";
 useApi();
  const { request, isFetching } = useApi(); userData } = useUser();
  const { userData } = useUser();
  const {
    register,
    handleSubmit,ate: { errors },
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(requestSchema),
  });= async (data: IRequestFormInputs) => {
  const onSubmit = async (data: IRequestFormInputs) => {
    setError("");e = `${data.date}T${data.time}`;
    const combinedDateTime = `${data.date}T${data.time}`;estData = {
    const requestData = {
      ...data,datetime: combinedDateTime,
      datetime: combinedDateTime,    };
    };

    const response = await request({PI_ENDPOINTS.HOSPITAL_REQUEST,
      API_ENDPOINT: API_ENDPOINTS.HOSPITAL_REQUEST,
      method: "POST",
      data: requestData,oken: userData?.accessToken,
      token: userData?.accessToken,
    });
    console.log(response);
    if (response.response_status_code == 6000) {
      reset()                                                         
      Swal.fire({
        icon: "success",
        title: "Request Submitted",ext: "Your request has been successfully submitted.",
        text: "Your request has been successfully submitted.",
      });code == 6001) {
    } else if (response.response_status_code == 6001) {
      setError("Password is incorrect"); else if (response.response_status_code == 6002) {
    } else if (response.response_status_code == 6002) {}
    }
  };
  return (
    <div id="Section" className="">
      <div className="max-w-full  bg-white  rounded-lg p-6 md:p-8 mx-auto">max-w-full  bg-white  rounded-lg p-6 md:p-8 mx-auto">
        <h2 className="text-[20px] font-sans font-[500] font-title text-gray-900 ">lassName="text-[20px] font-sans font-[500] font-title text-gray-900 ">
          Request Form
        </h2>
        <p className="font-[400] text-[14px] font-sans mt-1 text-gray-500">lassName="font-[400] text-[14px] font-sans mt-1 text-gray-500">
          Signed in as <span className="text-blue-600"> Medicity Kollam</span>Kollam</span>
        </p>
        <p className="text-red-500 text-sm mb-4 mt-7">{error}</p>>
        <form
          className="grid grid-cols-1 mt-0 md:grid-cols-2 gap-6" className="grid grid-cols-1 mt-0 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit(onSubmit)}bmit(onSubmit)}
        >
          <div className="">>
            <label className="block text-[14px] font-sans text-gray-900 font-[400] mb-2 ">lassName="block text-[14px] font-sans text-gray-900 font-[400] mb-2 ">
              Donation Typeion Type
            </label>
            <select
              id="bloodType"
              className="w-full border text-[#697586] border-neutral-300 rounded-md p-2" className="w-full border text-[#697586] border-neutral-300 rounded-md p-2"
              {...register("type_of_donation")}
            >
              <option value={""}>Select Type</option>
              <option value="blood">blood</option>n>
              <option value={"platelets"}>platelets</option> value={"platelets"}>platelets</option>
              <option value={"RBC"}>RBC</option>
            </select>
            <p className="text-red-500 text-sm mb-4">lassName="text-red-500 text-sm mb-4">
              {errors.type_of_donation?.message}rrors.type_of_donation?.message}
            </p>
          </div>
          <div className="">"">
            <label className="block text-[14px] font-sans text-gray-900 font-[400] mb-2 ">lassName="block text-[14px] font-sans text-gray-900 font-[400] mb-2 ">
              Blood Group Group
            </label>
            <select
              id="bloodType"
              className="w-full border text-[#697586] border-neutral-300 rounded-md p-2" className="w-full border text-[#697586] border-neutral-300 rounded-md p-2"
              {...register("blood_group")}
            >
              <option value={""}>Select Group</option>p</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>n>
              <option value="AB-">AB-</option>n>
              <option value="O+">O+</option> value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <p className="text-red-500 text-sm mb-4">lassName="text-red-500 text-sm mb-4">
              {errors.blood_group?.message}rrors.blood_group?.message}
            </p>
          </div>
          <div className="">">
            <label className="block text-[14px] font-sans text-gray-900 font-[400] mb-2 ">lassName="block text-[14px] font-sans text-gray-900 font-[400] mb-2 ">
              Wanted Countd Count
            </label>
            <select
              id="wantedCount"
              className="w-full border text-[#697586] border-neutral-300 rounded-md p-2" className="w-full border text-[#697586] border-neutral-300 rounded-md p-2"
              {...register("wanted_count")}
            >
              <option value={""}>Select Count</option>>Select Count</option>
              <option>1</option>
              <option>2</option>>2</option>
              <option>1</option>
            </select>
            <p className="text-red-500 text-sm mb-4">lassName="text-red-500 text-sm mb-4">
              {errors.wanted_count?.message}rrors.wanted_count?.message}
            </p>>
          </div>
          <div>
            <label className="block text-[14px] font-sans text-gray-900 font-[400] mb-2">lassName="block text-[14px] font-sans text-gray-900 font-[400] mb-2">
              Date
            </label>
            <input
              type="date"e"
              className={`${commonClass} `} // Add `date-input` class dynamicallylass} `} // Add `date-input` class dynamically
              autoFocusautoFocus
              {...register("date")}              {...register("date")}
            />

            <p className="text-red-500 text-sm mb-4">{errors.date?.message}</p>className="text-red-500 text-sm mb-4">{errors.date?.message}</p>
          </div>
          <div>
            <label className="block text-[14px] font-sans text-gray-900 font-[400] mb-2">lassName="block text-[14px] font-sans text-gray-900 font-[400] mb-2">
              Time              Time
            </label>l>

            <input
              type="time"e"
              className={`${commonClass} time-input`} // Add `time-input` class dynamicallylass} time-input`} // Add `time-input` class dynamically
              autoFocusautoFocus
              {...register("time")}
            />
            <p className="text-red-500 text-sm mb-4">{errors.time?.message}</p>xt-red-500 text-sm mb-4">{errors.time?.message}</p>
          </div>
          <div className="">
            <label
              htmlFor="password" htmlFor="password"
              className="block text-[14px] font-sans text-gray-900 font-[400] mb-2 "ck text-[14px] font-sans text-gray-900 font-[400] mb-2 "
            >
              Enter Passwordr Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="w-full border border-neutral-300 rounded-[8px] p-2"className="w-full border border-neutral-300 rounded-[8px] p-2"
              {...register("user_password")}
            />
            <p className="text-red-500 text-sm mb-4">lassName="text-red-500 text-sm mb-4">
              {errors.user_password?.message}rrors.user_password?.message}
            </p>
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-wrap justify-end">
            <div className="w-full">Name="w-full">
              <div className="w-full ml-1 flex flex-row justify-start sm:items-center items-center gap-2">ull ml-1 flex flex-row justify-start sm:items-center items-center gap-2">
                <input
                  type="checkbox"
                  className="mb-2 sm:mb-0 sm:mr-3"className="mb-2 sm:mb-0 sm:mr-3"
                  {...register("agree_terms")}
                />
                <p className="text-gray-500 text-[14px] text-center sm:text-left max-sm:text-[0.8rem]">lassName="text-gray-500 text-[14px] text-center sm:text-left max-sm:text-[0.8rem]">
                  I have read & I agree to the Terms and Conditionshave read & I agree to the Terms and Conditions
                </p>
              </div>
              <br />
              <div className="text-red-500 text-sm mb-4">lassName="text-red-500 text-sm mb-4">
                {errors.agree_terms?.message}rrors.agree_terms?.message}
              </div>              </div>
            </div>

            <Button
              type="submit"
              className="bg-black !w-[200px] text-white rounded-[8px] px-6 py-2 hover:bg-neutral-800 mt-6" className="bg-black !w-[200px] text-white rounded-[8px] px-6 py-2 hover:bg-neutral-800 mt-6"
              isLoading={isFetching}etching}
            >
              Submit Requestbmit Request
            </Button>utton>
          </div>div>
        </form>form>
      </div>  </div>
    </div>   </div>
  );  );


}}
