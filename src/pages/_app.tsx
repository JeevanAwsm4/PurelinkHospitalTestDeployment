import "@/styles/global.css"; // Ensure global styles are imported here
import Navbar from "@/components/organisms/navbar/Navbar";
import TopBar from "@/components/organisms/topbar/Topbar";
import { UserProvider } from "@/context/UserContext";
import PrivateRoutes from "@/components/PrivateRoutes";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const isNeeded = !["/signup", "/signin", "/subscribe", "/pending"].includes(pathname);
  const isProtected = !["/signup", "/signin", "/subscribe", "/pending", "/forbidden"].includes(pathname);

  return (
    <UserProvider>
      <div className="">
        <div className="inline-block">{isNeeded && <Navbar />}</div>
        <div className={`${isNeeded ? "lg:pl-52" : ""} max-lg:pl-0`}>
          <div className="md:p-8 md:pt-0 flex flex-col gap-8 p-2 pt-8">
            {isNeeded && <TopBar />}
            {isProtected ? (
              <PrivateRoutes>
                <Component {...pageProps} />
              </PrivateRoutes>
            ) : (
              <Component {...pageProps} />
            )}
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
