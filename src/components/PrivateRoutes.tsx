import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { useRouter, usePathname } from "next/navigation";
import { BASE_URL } from "@/config/apiConfig";

export default function PrivateRoutes({ children }: { children: React.ReactNode }) {
  const [isVerified, setIsVerified] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { userData } = useUser();
  const router = useRouter();
  const pathname = usePathname(); // Get current route

  useEffect(() => {
      const publicPaths = ["/signin", "/signup"];
    
      if (!userData && !publicPaths.includes(pathname)) {
        router.push("/signin");
      }
    

    let isMounted = true; // Prevents state updates after unmounting

    axios
      .get(`${BASE_URL}/panel/verify/`, {
        headers: { Authorization: `Bearer ${userData.accessToken}` },
      })
      .then((res) => {
        if (isMounted) {
          setIsVerified(res.data.status_code === 6000);
          setHasSubscription(res.data.subscription_active);
        }
      })
      .catch(() => {
        if (isMounted) setIsVerified(false);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false; // Cleanup to avoid memory leaks
    };
  }, [pathname, router, userData]); // Add `userData` to the dependency array

  if (isLoading) return <LoadingIndicator />;

  if (!isVerified) {
    if (pathname !== "/pending") router.push("/pending");
    return null;
  }

  if (!hasSubscription) {
    if (pathname !== "/subscribe") router.push("/subscribe");
    return null;
  }

  return <>{children}</>;
}

// Placeholder loading indicator component
function LoadingIndicator() {
  return <div>Loading...</div>;
}
