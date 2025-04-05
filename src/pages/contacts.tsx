"use client";

import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import AllContacts from "@/components/atomic/allContacts/AllContacts";
import { IContacts } from "@/interfaces/apiType";
import useApi from "@/hooks/useApi";
import { useUser } from "@/context/UserContext";
import { API_ENDPOINTS } from "@/config/apiConfig";

export default function ContactPage() {
  const [showAllContacts, setShowAllContacts] = useState(false);
  const [selectedDonors, setSelectedDonors] = useState([]);
  const [data, setData] = useState<IContacts>({
    current_data: [],
    other_data: [],
  });

  const { request } = useApi();
  const { userData, isLogged } = useUser();

  useEffect(() => {
    const storedValue = localStorage.getItem("showAllContacts");
    if (storedValue !== null) {
      setShowAllContacts(storedValue === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("showAllContacts", JSON.stringify(showAllContacts));
  }, [showAllContacts]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await request({
        API_ENDPOINT: API_ENDPOINTS.CONTACT,
        method: "GET",
        token: userData?.accessToken,
      });
      if (response.data.status_code === 6000) {
        console.log(response.data);
        setData(response.data);
      }
    };
    fetchData();
  }, []);

  if (!isLogged) {
    return <></>;
  }

  return (
    <>
      {showAllContacts ? (
        <AllContacts donors={selectedDonors} setShowAllContacts={setShowAllContacts} />
      ) : (
        <section className="bg-gray-50 w-full h-full max-md:p-0">
          {/* Contact Donors Section */}
          {data.current_data.map((request, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4 max-md:p-2 shadow-sm mb-7">
              <div className="flex items-center justify-between mb-4">
			  	<div>
  					<h3 className="text-lg font-medium mb-1 max-md:text-sm">Contact Donors</h3>
  					<p className="text-sm text-gray-500 max-md:text-xs">
    					Signed in as <span className="text-indigo-500 cursor-default">{data.name}</span>
  					</p>
					<br/>
  					<p className="text-sm text-gray-700 mt-2">
    					Filed a request for <span className="font-semibold">{request.wanted_count}</span> donors.
 		 			</p>
            <p className="text-sm text-gray-700 mt-2">
            <span className="font-semibold">{request.donor?.length}</span> donors have accepted.
 		 			</p>
				</div>
				<div>
					<p> Request ID : <strong>{request.uuid}</strong></p>
				</div>

              </div>

              <div className="overflow-x-auto">
                <div className="w-full h-full bg-white rounded-lg min-w-[500px]">
                  <div className="grid grid-cols-4 bg-gray-50 rounded-ss-lg rounded-se-lg shadow-sm text-sm p-3 max-md:p-2 font-medium gap-4">
                    <div className="text-left text-gray-800 max-md:text-xs">Donor ID</div>
                    <div className="text-left text-gray-800 max-md:text-xs">Phone No.</div>
                    <div className="text-left text-gray-800 max-md:text-xs">Name</div>
                    <div className="text-left text-gray-800 max-md:text-xs">Blood group</div>
                  </div>

                  {request.donor.map((donor_s, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 text-xs font-medium shadow-sm p-3 text-gray-500 max-md:p-2">
                      <div>#{donor_s.id}</div>
                      <div>{donor_s.phone_no}</div>
                      <div>{donor_s.name}</div>
                      <div>{donor_s.blood_group}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-4 max-md:mt-2">
              <button
                className="flex items-center text-sm gap-1 text-indigo-500 font-medium max-md:text-xs"
                onClick={() => {
                  setShowAllContacts(true);
                  setSelectedDonors(request.donor);
                }}
                >
                View all
              <ArrowRight className="w-4 h-4 block max-md:w-3 max-md:h-3" />
               </button>
              </div>

            </div>
          ))}

          {/* Expired Requests */}
          <div className="mt-6 w-full h-full">
            <h3 className="text-lg font-medium mb-1 max-md:text-sm">Expired Requests</h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-x-4 gap-y-4 mt-4 w-full h-full">
              {data.other_data.map((request, index) => (
                <div key={index} className="flex items-center flex-wrap gap-4 justify-between p-3 rounded-lg bg-[#FFFBFA] border border-red-100 w-full">
                  <p className="text-sm text-gray-500 font-medium leading-loose max-md:text-xs">
                    Request ID <br />
                    <span className="text-gray-700 inline-block mt-1">#{request.id ?? "N/A"}</span>
                  </p>
                  <p className="text-sm text-gray-500 font-medium leading-loose max-md:text-xs">
                    Requested Date <br />
                    <span className="text-gray-700 inline-block mt-1">
                      {request.datetime ? new Date(request.datetime).toLocaleDateString() : "N/A"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 font-medium leading-loose max-md:text-xs">
                    Status <br />
                    <span className="bg-yellow-50 py-0.5 px-2 border border-yellow-300 rounded-2xl text-red-700 inline-block">
                      {"pending"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 font-medium leading-loose max-md:text-xs">
                    No of requested donors <br />
                    <span className="text-gray-700 max-md:text-xs inline-block mt-1">
                      {request.donors ?? 0}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 font-medium leading-loose max-md:text-xs">
                    No of accepted donors <br />
                    <span className="text-gray-700 max-md:text-xs">
                      {request.wanted_count ?? 0}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
