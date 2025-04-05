import { ArrowLeft } from "lucide-react";

interface Donor {
  name?: string;
  phone_no?: string;
  blood_group?: string;
}

interface AllContactsProps {
  setShowAllContacts: (value: boolean) => void;
  donors: Donor[]; // Donors passed from ContactPage
}

export default function AllContacts({ setShowAllContacts, donors }: AllContactsProps) {
  const goBack = () => {
    setShowAllContacts(false);
    localStorage.setItem("showAllContacts", "false");
  };

  return (
    <section className="bg-gray-50 w-full h-full p-6">
      {/* Back Button */}
      <div className="flex items-center justify-center mb-4">
        <button
          className="text-sm text-indigo-500 font-medium flex items-center gap-1"
          onClick={goBack}
        >
          <ArrowLeft className="w-4 h-4 block" />
          Back
        </button>
      </div>

      {/* Donor Table */}
      <div className="mt-4">
        <h4 className="text-md font-medium mb-2">All Donors</h4>
        {donors.length === 0 ? (
          <p className="text-gray-500 text-sm">No donors found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Serial No</th>
                  <th className="border p-2 text-left">Full Name</th>
                  <th className="border p-2 text-left">Phone Number</th>
                  <th className="border p-2 text-left">Blood Group</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2">#{index + 1}</td>
                    <td className="border p-2">{donor.name || "N/A"}</td>
                    <td className="border p-2">{donor.phone_no || "N/A"}</td>
                    <td className="border p-2">{donor.blood_group || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
