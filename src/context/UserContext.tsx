"use client"; // Ensures it's client-side only

import { API_ENDPOINTS } from "@/config/apiConfig";
import useApi from "@/hooks/useApi";
import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";

interface UserData {
  accessToken?: string;
  refreshToken?: string;
  username?: string;
}

interface UserContextType {
  userData: UserData | null;
  updateUserData: (data: UserData | null) => void;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  isLogged: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { request } = useApi();
  const [isLogged, setIsLogged] = useState(false);
  const [isVerifiedUser, setIsVerifiedUser] = useState(false);
  const router = useRouter();
  const hasVerified = useRef(false); // Prevents multiple verifications

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
    updateUserData({
      ...userData,
      accessToken,
      refreshToken,
    });
    setIsLogged(true);
  };

  const logout = async () => {
    updateUserData(null);
    setIsLogged(false);
    localStorage.removeItem("user_data");
    router.push("/signin");
  };

  useEffect(() => {
    if (!userData?.refreshToken) {
      setIsVerifiedUser(true);
      if (router.pathname !== "/signin" && router.pathname !== "/signup") {
        router.push("/signin"); // Redirect only if not on `/signin` or `/signup`
      }
      return;
    }

    if (hasVerified.current) return; // Prevents multiple calls
    hasVerified.current = true;

    const verifyUser = async () => {
      try {
        const response = await request({
          API_ENDPOINT: API_ENDPOINTS.USER_VERIFY,
          method: "POST",
          data: { refresh: userData.refreshToken },
        });

        if (response.ok) {
          setIsLogged(true);
          if (router.pathname === "/signin") router.push("/");
        } else {
          setIsLogged(false);
          localStorage.removeItem("user_data");
          router.push("/signin");
        }
      } catch (error) {
        console.error("Verification error:", error);
      } finally {
        setIsVerifiedUser(true);
      }
    };

    verifyUser();
  }, [userData]); // Only run when userData changes

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
