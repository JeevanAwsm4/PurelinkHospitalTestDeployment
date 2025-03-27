"use client";
import Requests from "@/components/atomic/requests/Requests";
import { useUser } from "@/context/UserContext";
import React from "react";

export default function Request() {
  const {isLogged} = useUser()
  if (!isLogged) {
    return <></>;
  }
  return <Requests />;
}
