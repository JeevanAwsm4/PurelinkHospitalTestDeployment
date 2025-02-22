import { reportTableData } from "@/@db/report";
import React from "react";

export default function RestrictionsPage() {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div>
        <div className="flex flex-col gap-1">
          <div className="text-[1.25rem] font-medium leading-[1.5] tracking-normal">
            Reports
          </div>
          <div className="text-[0.875rem] font-normal leading-[1.43] tracking-normal text-gray-500">
            Signed in as{" "}
            <span className="text-[0.875rem] font-normal leading-[1.43] tracking-normal text-[#7464F0]">
              Medicity Kollam{" "}
            </span>
          </div>
        </div>
      </div>
      <div className="text-[1rem] font-medium leading-[1.25] tracking-normal text-gray-900">
        Request from past 7 days
      </div>
      <div className="rounded-3xl bg-gray-100 border-[1px] border-gray-200 px-4 py-6 pt-4 flex flex-col gap-4">
        <div className="flex justify-between max-md:flex-col">
          <div className="text-[0.875rem] font-medium leading-[1.43] tracking-normal">
            Date : 10/02/23
          </div>
          <div className="text-[0.875rem] font-medium leading-[1.43] tracking-normal text-gray-800">
            Request id : e609fb7a-278e-4c94-9e83-766d96a37060
          </div>
        </div>

        {/* Ensure only table scrolls */}
        <div className="overflow-x-auto">
          <table className="bg-white rounded-2xl min-w-[800px] w-full">
            <thead>
              <tr className="border-b-[1px] border-gray-200">
                <th className="text-[1rem] font-bold leading-[1.5] tracking-normal text-gray-600 py-4 px-6 text-start whitespace-nowrap">
                  Donor ID
                </th>
                <th className="text-[1rem] font-bold leading-[1.5] tracking-normal text-gray-600 py-4 px-6 text-start whitespace-nowrap">
                  Name
                </th>
                <th className="text-[1rem] font-bold leading-[1.5] tracking-normal text-gray-600 py-4 px-6 text-start whitespace-nowrap">
                  Status
                </th>
                <th className="text-[1rem] font-bold leading-[1.5] tracking-normal text-gray-600 py-4 px-6 text-start whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reportTableData.map((item, index) => (
                <tr key={index} className="border-b-[1px] border-gray-200">
                  <td className="text-[0.875rem] font-medium leading-[1.43] tracking-normal py-4 px-6 whitespace-nowrap">
                    {item.donorId}
                  </td>
                  <td className="text-[0.875rem] font-medium leading-[1.43] tracking-normal py-4 px-6 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="flex justify-center items-center">
                    <div
                      className={`px-2 py-[2px] border-[1px] ${
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
                      text-[0.75rem] font-medium leading-[1.5] tracking-normal text-center capitalize flex justify-center rounded-full w-[5.3rem]`}
                    >
                      {item.status}
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="rounded-lg px-3 py-2 text-[0.875rem] font-medium leading-[1.43] tracking-normal bg-red-300 text-white w-fit">
                      Report
                    </div>
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
