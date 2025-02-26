"use client";

import { ArrowRight } from "lucide-react";

import { donorRequests, expiredRequests } from "@/@db/contacts/sampleRequests";
import AllContacts from "@/components/atomic/allContacts/AllContacts";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [showAllContacts, setShowAllContacts] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem("showAllContacts");
    if (storedValue !== null) {
      setShowAllContacts(storedValue === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("showAllContacts", JSON.stringify(showAllContacts));
  }, [showAllContacts]);
  return (
    <>
      {showAllContacts ? (
        <AllContacts setShowAllContacts={setShowAllContacts} />
      ) : (
        <section className="bg-gray-50 w-full h-full p-6 max-md:p-0">
          {/* Contact Donors Section */}
          <div className="bg-gray-100 rounded-lg p-4 max-md:p-2 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium mb-1 max-md:text-sm">
                  Contact Donors
                </h3>
                <p className="text-sm text-gray-500 max-md:text-xs">
                  Signed in as
                  <span className="text-indigo-500 cursor-default">
                    {" "}
                    Medicity Kollam
                  </span>
                </p>
              </div>
              <div>
                <button className="flex text-sm items-center gap-1 text-indigo-500 font-medium max-md:text-xs">
                  See Details
                  <ArrowRight className="w-4 h-4 block max-md:w-3 max-md:h-3" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto ">
              <div className="w-full h-full bg-white rounded-lg  min-w-[500px]">
                <div className="grid grid-cols-4 bg-gray-50 rounded-ss-lg rounded-se-lg shadow-sm text-sm p-3 max-md:p-2 font-medium gap-4">
                  <div className="text-left text-gray-800 max-md:text-xs">
                    Request ID
                  </div>
                  <div className="text-left text-gray-800 max-md:text-xs">
                    Requested Date
                  </div>
                  <div className="text-left text-gray-800 max-md:text-xs">
                    Requested Donors
                  </div>
                  <div className="text-left text-gray-800 max-md:text-xs">
                    Accepted Donors
                  </div>
                </div>

                {donorRequests.map((request, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-4 gap-4 text-xs font-medium shadow-sm p-3 text-gray-500 max-md:p-2"
                  >
                    <div>#{request.id}</div>
                    <div>{request.requestedDate}</div>
                    <div>{request.requestedDonors}</div>
                    <div>{request.acceptedDonors}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-4 max-md:mt-2">
              <button
                className="flex items-center text-sm gap-1 text-indigo-500 font-medium max-md:text-xs"
                onClick={() => setShowAllContacts(true)} // Go to AllContacts
              >
                View all
                <ArrowRight className="w-4 h-4 block max-md:w-3 max-md:h-3" />
              </button>
            </div>
          </div>

          {/* Expired Requests */}
          <div className="mt-6 w-full h-full">
            <h3 className="text-lg font-medium mb-1 max-md:text-sm">
              Expired Requests
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]  gap-x-4 gap-y-4 mt-4 w-full h-full">
              {expiredRequests.map((request, index) => (
                <div
                  key={index}
                  className="flex items-center flex-wrap gap-4 justify-between p-3 rounded-lg bg-[#FFFBFA] border border-red-100  w-full"
                >
                  <p className="text-sm text-gray-500 font-medium leading-loose max-md:text-xs">
                    Request ID <br />
                    <span className="text-gray-700 inline-block mt-1">
                      #{request.id}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 font-medium leading-loose max-md:text-xs">
                    Requested Date <br />
                    <span className="text-gray-700 inline-block mt-1">
                      {request.requestedDate}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 font-medium leading-loose max-md:text-xs">
                    Status <br />
                    <span className="bg-yellow-50 py-0.5 px-2 border border-yellow-300 rounded-2xl text-red-700 inline-block ">
                      {request.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 font-medium leading-loose max-md:text-xs">
                    No of requested donors <br />
                    <span className="text-gray-700 max-md:text-xs inline-block mt-1">
                      {request.requestedDonors}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 font-medium leading-loose max-md:text-xs">
                    No of accepted donors <br />
                    <span className="text-gray-700 max-md:text-xs">
                      {request.acceptedDonors}
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
