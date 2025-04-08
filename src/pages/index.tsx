"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Button from "@/components/atomic/button/Button";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import useApi from "@/hooks/useApi";
import { API_ENDPOINTS } from "@/config/apiConfig";
import { useUser } from "@/context/UserContext";
import { IHomeData, IRequestData } from "@/interfaces/apiType";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<IHomeData>({
    receivers: -1,
    your_request: -1,
    active_donors: -1,
    recent_requests: [],
  });
  const { request } = useApi();
  const { userData, isLogged } = useUser();

  useEffect(() => {
    //console.log("Stored Access Token:", userData?.accessToken);
    //console.log("Stored Refresh Token:", userData?.refreshToken);

    const fetchData = async () => {
      const response = await request({
        API_ENDPOINT: API_ENDPOINTS.HOME_DATA,
        method: "GET",
        token: userData?.accessToken,
      });
      if (response.ok) {
        console.log(response);
        const refinedData = response.data.recent_requests.map(
          (data: IRequestData) => {
            const date = new Date(data.datetime).toLocaleDateString();
            return { ...data, datetime: date };
          }
        );
        setData({ ...response.data, recent_requests: refinedData });
      }
    };
    fetchData();
  }, [request, userData?.accessToken, userData?.refreshToken]);

  const homeCards = [
    {
      icon: "/svg/statistic_card1.svg",
      heading: "Request This Month",
      arrowDirection: "top",
      theme: "primary",
      count: data.receivers,
      highlight: "12 requests",
      description: "More than last month",
      highlight_type: "positive",
    },
    {
      icon: "/svg/statistic_card2.svg",
      heading: "Donors in city",
      arrowDirection: "bottom",
      theme: "primary",
      count: data.active_donors,
      highlight: "12 requests",
      description: "More than last month",
      highlight_type: "negative",
    },
    {
      icon: "/svg/statistic_card3.svg",
      heading: "Total request in city",
      arrowDirection: "bottom",
      theme: "primary",
      count: data.your_request,
      highlight: "12 requests",
      description: "More than last month",
      highlight_type: "positive",
    },
  ];

  if (!isLogged) {
    return <></>;
  }

  return (
    <div>
      <div className="flex w-full flex-row  gap-4 flex-wrap max-[723px]:justify-center">
        {homeCards.map((card, index) => (
          <article
            className={`relative w-[22.125rem]  rounded-[1rem] bg-white  
shadow-[0_2px_4px_-2px_rgba(16,24,40,0.06),0_4px_8px_-2px_rgba(16,24,40,0.10)] p-4 ${
              card.highlight_type == "positive"
                ? "statistic_card2"
                : "statistic_card1"
            }`}
            key={index}
          >
            <div className="flex flex-row justify-between ">
              <div className="flex gap-4">
                <Image src={card.icon} alt="Icon" width={24} height={24} />
                <h4 className="text-[1.25rem] font-medium leading-[1.875rem] tracking-[0]">
                  {card.heading}
                </h4>
              </div>
              <div>
                {card.arrowDirection == "top" ? (
                  <ArrowUpwardIcon sx={{ color: "green", fontSize: 24 }} />
                ) : (
                  <ArrowDownwardIcon sx={{ color: "red", fontSize: 24 }} />
                )}
              </div>
            </div>
            <div className="mt-8 z-10">
              <h3 className="text-[2.25rem] font-medium leading-[2.75rem] tracking-[-0.02em]">
                {card.count}+
              </h3>
            </div>
            <div className="mt-10 !z-10">
              <div className="flex flex-row gap-3 items-center">
                <div
                  className={`rounded-2xl px-4 py-[2px] ${
                    card.highlight_type == "positive"
                      ? "bg-gray-200"
                      : "bg-red-300"
                  } `}
                >
                  {card.highlight}
                </div>
                <div className="text-[1rem] font-medium leading-[1.25rem] tracking-[0]">
                  {card.description}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 w-full">
        <div className="flex justify-between items-center">
          <div className="text-[1.25rem] font-medium leading-[1.875rem] tracking-[0] max-md:text-base">
            Provision Blood donation slot
          </div>
          <div>
            <Button
              disabled={false}
              onClick={() => {
                router.push("/requests");
              }}
              className="text-[0.875rem] font-semibold leading-[1.25rem] tracking-[0] max-md:text-sm max-md:px-3"
            >
              <div className="max-md:hidden inline-block">
                <AddIcon />
              </div>
              New request
            </Button>
          </div>
        </div>

        {/* Add this div for responsiveness */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full min-w-[600px]">
            {" "}
            {/* Ensure minimum width */}
            <thead>
              <tr className="text-left">
                <th className="p-4 border border-gray-200 min-w-[180px]">
                  Request ID
                </th>
                <th className="p-4 border border-gray-200 min-w-[180px]">
                  Blood Type
                </th>
                <th className="p-4 border border-gray-200 min-w-[180px]">
                  Donor Count
                </th>
                <th className="p-4 border border-gray-200 min-w-[180px]">
                  Wanted Count
                </th>
                <th className="p-4 border border-gray-200 min-w-[180px]">
                  Status
                </th>
                <th className="p-4 border border-gray-200 min-w-[180px]">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {data.recent_requests.map((data, index) => (
                <tr key={index} className="text-left">
                  <td className="p-4 border border-gray-200 min-w-[180px]">
                    {data.uuid}
                  </td>
                  <td className="p-4 border border-gray-200 min-w-[180px]">
                    {data.blood_group}
                  </td>
                  <td className="p-4 border border-gray-200 min-w-[180px]">
                    {data.donors_count}
                  </td>
                  <td className="p-4 border border-gray-200 min-w-[180px]">
                    {data.wanted_count}
                  </td>
                  <td className="p-4 border border-gray-200 capitalize min-w-[180px] flex ">
                    <div className="bg-[#FEEE95] px-2 py-1 rounded-2xl text-[#B54708] text-[0.75rem] font-medium leading-[1.125rem] tracking-[0] text-center">
                      {data.status}
                    </div>
                  </td>
                  <td className="p-4 border border-gray-200 min-w-[180px]">
                    {data.datetime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
