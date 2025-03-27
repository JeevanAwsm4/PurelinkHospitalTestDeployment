import { reportTableData } from "@/@db/report";
import { API_ENDPOINTS } from "@/config/apiConfig";
import { useUser } from "@/context/UserContext";
import useApi from "@/hooks/useApi";
import { ICityComposition, IDonationRequestFull, IReportData } from "@/interfaces/apiType";
import React, { useState } from "react";

export default function RestrictionsPage() {
  const [data, setData] = useState<IReportData>({
    current_data: [],
  });
  const { request } = useApi();
  const { userData ,isLogged} = useUser();
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await request({
        API_ENDPOINT: API_ENDPOINTS.REPORT_DATA,
        method: "GET",
        token: userData?.accessToken,
      });
      if (response.ok) {
        const filteredData: IDonationRequestFull[] =
          response.data.current_data.filter(
            (item: IDonationRequestFull) => {
              const today = new Date();
              const date = new Date(item.datetime);
              const diffTime = Math.abs(today.getTime() - date.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              if (diffDays <= 7) {
                return true;
              }else{
                return false;
              }
            }
          );
        setData({...response.data, current_data: filteredData});
      }
    };
    fetchData();
  }, []);
  if (!isLogged) {
    return <></>;
  }
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div>
        <div className="flex flex-col gap-1">
          <div className="text-[1.25rem] font-medium leading-[1.5] tracking-normal max-md:text-base">
            Reports
          </div>
          <div className="text-[0.875rem] font-normal leading-[1.43] tracking-normal text-gray-500  ">
            Signed in as{" "}
            <span className="text-[0.875rem] font-normal leading-[1.43] tracking-normal text-[#7464F0]">
              Medicity Kollam{" "}
            </span>
          </div>
        </div>
      </div>
      <div className="text-[1rem] font-medium leading-[1.25] tracking-normal text-gray-900 max-md:text-xs">
        Request from past 7 days
      </div>
      {data.current_data.map((item, index) => (
        <div
          key={index}
          className="rounded-3xl bg-gray-100 border-[1px] border-gray-200 px-4 py-6 pt-4 max-sm:px-2 flex flex-col gap-4"
        >
          <div className="flex justify-between max-md:flex-col">
            <div className="text-[0.875rem] font-medium leading-[1.43] tracking-normal max-sm:text-xs">
              Date : {new Date(item.datetime).toLocaleDateString()}
            </div>
            <div className="text-[0.875rem] font-medium leading-[1.43] tracking-normal text-gray-800 max-sm:text-xs">
              Request id : {item.uuid}
            </div>
          </div>

          {/* Ensure only table scrolls */}
          <div className="overflow-x-auto">
            <table className="bg-white rounded-2xl min-w-[600px] w-full">
              <thead>
                <tr className="border-b-[1px] border-gray-200">
                  <th className="text-[1rem] font-bold leading-[1.5] tracking-normal text-gray-600 py-4 px-6 max-md:py-2 max-md:px-3 text-start whitespace-nowrap  max-md:text-[0.6rem] ">
                    Donor ID
                  </th>
                  <th className="text-[1rem] font-bold leading-[1.5] tracking-normal text-gray-600 py-4 px-6 max-md:py-2 max-md:px-3 text-start whitespace-nowrap max-md:text-[0.6rem] ">
                    Name
                  </th>
                  <th className="text-[1rem] font-bold leading-[1.5] tracking-normal text-gray-600 py-4 px-6 max-md:py-2 max-md:px-3 text-start whitespace-nowrap max-md:text-[0.6rem] ">
                    Status
                  </th>
                  <th className="text-[1rem] font-bold leading-[1.5] tracking-normal text-gray-600 py-4 px-6 max-md:py-2 max-md:px-3 text-start whitespace-nowrap max-md:text-[0.6rem] ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {item.donor.map((item, index) => (
                  <tr key={index} className="border-b-[1px] border-gray-200">
                    <td className="text-[0.875rem] font-medium leading-[1.43] tracking-normal py-4 px-6 max-md:py-2 max-md:px-3 whitespace-nowrap max-md:text-[0.6rem] ">
                      #{item.id}
                    </td>
                    <td className="text-[0.875rem] font-medium leading-[1.43] tracking-normal py-4 px-6 max-md:py-2 max-md:px-3 whitespace-nowrap max-md:text-[0.6rem] ">
                      {item.name}
                    </td>
                    <td className="py-4 px-6 max-md:py-2 max-md:px-3">
                      {/* <div
                        className={`px-2 py-[2px]  border-[1px] ${
                          item.status == "good" &&
                          "border-green-200 text-green-500 bg-green-100"
                        }
                      ${
                        item.status == "bad" &&
                        "border-red-200 text-red-500 bg-red-100"
                      }
                      ${
                        item.status == "average" &&
                        "border-yellow-200 text-yellow-700 bg-yellow-100"
                      }  
                      text-[0.75rem] font-medium leading-[1.5] tracking-normal text-center capitalize flex justify-center rounded-full w-[5.3rem] max-md:w-[3.4rem]  max-md:text-[0.6rem]`}
                      >
                        {item.status}
                      </div> */}
                      <div
                        className={`px-2 py-[2px]  border-[1px] border-green-200 text-green-500 bg-green-100
                      text-[0.75rem] font-medium leading-[1.5] tracking-normal text-center capitalize flex justify-center rounded-full w-[5.3rem] max-md:w-[3.4rem]  max-md:text-[0.6rem]`}
                      >
                        {"good"}
                      </div>
                    </td>
                    <td className="py-4 px-6 max-md:py-2 max-md:px-3 whitespace-nowrap">
                      <div className="rounded-lg px-3 py-2 text-[0.875rem] font-medium leading-[1.43] tracking-normal bg-red-300 text-white w-[6.25rem] text-center max-md:w-[4rem] max-md:text-[0.6rem]">
                        Report
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
