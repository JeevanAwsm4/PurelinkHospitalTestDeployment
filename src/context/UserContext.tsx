"use client"; // Ensures it's client-side only

import { createContext, useContext, useState, ReactNode } from "react";

interface UserData {
  token?: string;
  username?: string;
}

interface UserContextType {
  userData: UserData | null;
  updateUserData: (data: UserData | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user_data") || "null")
      : null
  );

  const updateUserData = (data: UserData | null) => {
    setUserData(data);
    if (data) {
      localStorage.setItem("user_data", JSON.stringify(data));
    } else {
      localStorage.removeItem("user_data");
    }
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const userReducer = (
  state: UserData,
  action: { type: string; payload?: UserData }
) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};
