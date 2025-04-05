"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import useApi from "@/hooks/useApi";
import { API_ENDPOINTS, BASE_URL } from "@/config/apiConfig";
import Button from "@/components/atomic/button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Plan {
  price: string; // Ensure `price` is defined
  duration_display: string;
  name: string;
  features: string[];
  payment_link: string;
}

const Subscribe = () => {
  const { userData } = useUser();
  const { request } = useApi();
  const [plans, setPlans] = useState<Plan[]>([]); // Use the `Plan` interface for typing
  const [isVerified, setIsVerified] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [userName, setUserName] = useState(""); // Store the user's name
  const router = useRouter();

  useEffect(() => {
    if (!userData) {
      router.push("/signin");
      return;
    }

    // Check verification & subscription status
    axios
      .get(`${BASE_URL}/panel/verify/`, {
        headers: { Authorization: `Bearer ${userData.accessToken}` },
      })
      .then((res) => {
        if (res.data.status_code === 6000) {
          setIsVerified(true);
          setHasSubscription(res.data.subscription_active);
          setUserName(res.data.name); // Set the user's name
          if (res.data.subscription_active) {
            router.push("/"); // Redirect to dashboard if subscribed
          }
        } else {
          router.push("/pending"); // Redirect to pending if not verified
        }
      })
      .catch(() => {
        router.push("/signin"); // Fallback to sign-in on error
      });
  }, [userData, router]);

  useEffect(() => {
    if (!isVerified) return;

    const fetchPlans = async () => {
      const response = await request({
        API_ENDPOINT: API_ENDPOINTS.SUBSCRIPTION,
        method: "GET",
        token: userData?.accessToken,
      });

      if (response.ok) {
        setPlans(response.data.data); // Ensure `response.data.data` matches the `Plan` interface
      }
    };

    fetchPlans();
  }, [isVerified, userData, request]);

  if (!isVerified || hasSubscription) return null; // Prevent rendering if conditions are not met

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
        <span className="text-blue-600">Uh Oh!</span> Looks like you&apos;re out of fuel ⛽.
        Resubscribe <a href="#" className="text-blue-600 underline">here</a>.
      </h2>
      <div className="flex flex-col md:flex-row flex-wrap gap-8 md:gap-14 items-center">
        {plans.map((plan, index) => (
          <article
            key={index}
            className="w-full md:w-[20rem] h-auto md:h-[26.5rem] rounded-tl-[1rem] border-t border-[#E3E8EF] bg-white  
              shadow-[0_4px_6px_-2px_rgba(16,24,40,0.03),0_12px_16px_-4px_rgba(16,24,40,0.08)]
              text-center p-6 md:p-8"
          >
            <p className="text-2xl md:text-[2.25rem] font-semibold leading-[2rem] md:leading-[2.625rem] tracking-[-0.02em] text-gray-900">
              {plan.price}₹/{plan.duration_display}
            </p>
            <p className="mt-2 text-lg md:text-[1.25rem] font-semibold leading-[1.5rem] md:leading-[1.875rem]">
              {plan.name}
            </p>
            <p className="mt-1 text-sm md:text-[1rem] font-normal leading-[1.125rem] md:leading-[1.25rem] text-gray-600">
              {"No description"}
            </p>

            <ul className="mb-8 mt-6 md:mb-10 md:mt-8 flex flex-col gap-3 md:gap-4">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Image src={"/svg/tickIcon.svg"} alt="Tick Icon" width={20} height={20} />
                  <p className="text-sm md:text-[1rem] font-normal leading-[1.125rem] md:leading-[1.25rem] text-gray-600">
                    {feature}
                  </p>
                </li>
              ))}
            </ul>
            <div>
              <Button onClick={() => window.location.href = plan.payment_link}>
                Buy now
              </Button>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-600">
        Signed in as <span className="text-blue-600">{userName || "Unknown User"}</span>
      </p>
      <p>It&apos;s a great day!</p>
    </div>
  );
};

export default Subscribe;
