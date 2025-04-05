"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Logo from "/public/images/logo.svg";
import axios from "axios";
import { BASE_URL } from "@/config/apiConfig";

export default function NotAvailable() {
  const { userData } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!userData) {
      router.push("/signin");
      return;
    }

    axios
      .get(`${BASE_URL}/panel/verify/`, {
        headers: { Authorization: `Bearer ${userData.accessToken}` },
      })
      .then((res) => {
        if (res.data.status_code === 6000) {
          // User is verified
          if (res.data.subscription_active) {
            router.push("/"); // Redirect to dashboard
          } else {
            router.push("/subscribe"); // Redirect to subscription page
          }
        }
      })
      .catch(() => {
        router.push("/signin"); // If verification fails, sign them out
      });
  }, [userData, router]); // Add missing dependency

  if (!userData) return null; // Prevent rendering before redirect

  return (
    <section className="flex h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg md:flex-row flex-col">
        <div className="flex flex-col items-center justify-center bg-gray-200 p-8 md:w-1/2">
          <Image src={Logo} alt="Logo" className="w-32 mb-4" />
        </div>
        <div className="flex items-center justify-center p-8 md:w-1/2">
          <h1 className="text-center text-xl font-semibold text-gray-700">
            Your signup request has been successfully sent to the{" "}
            <span className="text-red-500">PureLink Team</span> for verification.
          </h1>
        </div>
      </div>
    </section>
  );
}
