import { subscriptionData } from "@/@db/subscription";
import React from "react";
import Button from "@/components/atomic/button/Button";
import Image from "next/image";

const Subscription = () => {
  return (
    <div className="p-4 md:p-8 flex flex-col gap-6 md:gap-8">
      {/* Heading */}
      <div>
        <h4 className="text-lg md:text-[1.25rem] font-medium leading-[1.5rem] md:leading-[1.875rem] text-left">
          Manage your subscription
        </h4>
        <p className="text-sm md:text-[0.875rem] font-normal leading-[1.125rem] md:leading-[1.25rem] text-left text-gray-500">
          Choose the plan that fits your organization’s needs
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-base md:text-[1.125rem] font-medium leading-[1.5rem] md:leading-[1.25rem] text-left">
          Your Subscription ends on Dec 25, 2024
        </div>
        <div className="flex flex-col md:flex-row flex-wrap gap-8 md:gap-14 items-center">
          {subscriptionData.map((data) => (
            <article
              key={data.id}
              className="w-full md:w-[20rem] h-auto md:h-[26.5rem] rounded-tl-[1rem] border-t border-[#E3E8EF] bg-white  
              shadow-[0_4px_6px_-2px_rgba(16,24,40,0.03),0_12px_16px_-4px_rgba(16,24,40,0.08)]
              text-center p-6 md:p-8"
            >
              <p className="text-2xl md:text-[2.25rem] font-semibold leading-[2rem] md:leading-[2.625rem] tracking-[-0.02em] text-gray-900">
                ${data.price}/{data.duration}mth
              </p>
              <p className="mt-2 text-lg md:text-[1.25rem] font-semibold leading-[1.5rem] md:leading-[1.875rem]">
                {data.name}
              </p>
              <p className="mt-1 text-sm md:text-[1rem] font-normal leading-[1.125rem] md:leading-[1.25rem] text-gray-600">
                {data.description}
              </p>

              <ul className="mb-8 mt-6 md:mb-10 md:mt-8 flex flex-col gap-3 md:gap-4">
                {data.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Image
                      src={"/svg/tickIcon.svg"}
                      alt="Tick Icon"
                      width={20}
                      height={20}
                    />
                    <p className="text-sm md:text-[1rem] font-normal leading-[1.125rem] md:leading-[1.25rem] text-gray-600">
                      {feature}
                    </p>
                  </li>
                ))}
              </ul>
              <div>
                <Button disabled={data.is_active} onClick={() => {}}>
                  {data.is_active ? "Active" : "Buy now"}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
