import { donorRequests } from "@/@db/contacts/sampleRequests";
import { IContacts } from "@/interfaces/apiType";
import { ArrowLeft } from "lucide-react";

interface AllContactsProps {
  setShowAllContacts: (value: boolean) => void;
  data: IContacts;
}

export default function AllContacts({
  setShowAllContacts,
  data,
}: AllContactsProps) {
  const goBack = () => {
    setShowAllContacts(false);
    localStorage.setItem("showAllContacts", "false"); // Reset stored state
  };

  return (
    <section className="bg-gray-50 w-full h-full p-6">
      <div className="flex items-center justify-center mb-4">
        <button
          className="text-sm text-indigo-500 font-medium flex items-center gap-1"
          onClick={goBack} // Go back to ContactPage
        >
          <ArrowLeft className="w-4 h-4 block" />
          Back
        </button>
      </div>

      <div className="space-y-6">
        {data.current_data.map((request, index) => (
          <div key={index} className="w-full h-full">
            <div className="flex items-center gap-6 lg:flex-row flex-col">
              <span className="bg-indigo-500 py-1 px-2.5 text-white text-sm rounded-full">
                {index + 1}
              </span>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 hover:shadow-sm transition-shadow w-full h-full bg-white rounded-lg border py-3 px-6 text-sm">
                <p className="leading-loose text-gray-500 font-medium">
                  Request ID <br />
                  <span className="text-gray-700">{"1234"}</span>
                </p>
                <p className="leading-loose text-gray-500 font-medium">
                  Requested Date <br />
                  <span className="text-gray-700">
                    {new Date(request.datetime).toLocaleDateString()}
                  </span>
                </p>
                <p className="leading-loose text-gray-500 font-medium">
                  Number of requested donors <br />
                  <span className="text-gray-700">{request.donor?.length}</span>
                </p>
                <p className="leading-loose text-gray-500 font-medium">
                  Number of accepted donors <br />
                  <span className="text-gray-700">{request.wanted_count}</span>
                </p>
                <p className="leading-loose text-gray-500 font-medium">
                  Serial No <br />
                  <span className="text-gray-700">{''}</span>
                </p>
                <p className="leading-loose text-gray-500 font-medium">
                  Full Name <br />
                  <span className="text-gray-700">{''}</span>
                </p>
                <p className="leading-loose text-gray-500 font-medium">
                  Phone Number <br />
                  <span className="text-gray-700">{''}</span>
                </p>
                <p className="leading-loose text-gray-500 font-medium">
                  Blood Group <br />
                  <span className="text-gray-700">{request.blood_group}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
