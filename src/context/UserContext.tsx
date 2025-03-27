"use client"; // Ensures it's client-side only

import { API_ENDPOINTS } from "@/config/apiConfig";
import useApi from "@/hooks/useApi";
import { clear } from "console";
import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface UserData {
  accessToken?: string;
  refreshToken?: string;
  username?: string;
}

interface UserContextType {
  userData: UserData | null;
  updateUserData: (data: UserData | null) => void;
  login: (accessToken: string, refresh: string) => void;
  logout: () => void;
  isLogged: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { request } = useApi();
  const [isLogged, setIsLogged] = useState(false);
  const [isVerifiedUser, setIsVerifiedUser] = useState(false);
  const router = useRouter();
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

  const login = (accessToken: string, refreshToken: string) => {
    console.log(accessToken, refreshToken);
    updateUserData({
      ...userData,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    setIsLogged(true);
  };

  const logout = async () => {
    updateUserData(null);
    setIsLogged(false);
    await localStorage.removeItem("user_data");
    router.push("/signin");
  };

  useEffect(() => {
    const verifyUser = async () => {
      const response = await request({
        API_ENDPOINT: API_ENDPOINTS.USER_VERIFY,
        method: "POST",
        data: { refresh: userData?.refreshToken },
        redirect: true,
      });
      if (response.ok) {
        setIsLogged(true);
        router.push("/");
      } else {
        setIsLogged(false);
        router.push("/signin");
      }
      setIsVerifiedUser(true);
      return;
    };
    if (userData?.refreshToken) {
      verifyUser();
    } else {
      setIsVerifiedUser(true);
      router.push("/signin");
    }
  }, []);
  if (!isVerifiedUser) {
    return <div>Loading...</div>;
  }
  return (
    <UserContext.Provider
      value={{ userData, updateUserData, login, logout, isLogged }}
    >
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
