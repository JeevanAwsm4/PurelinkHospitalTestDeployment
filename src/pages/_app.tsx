import Navbar from "@/components/organisms/navbar/Navbar";
import TopBar from "@/components/organisms/topbar/Topbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const isNeeded = !["/signup", "/signin","/contacts"].includes(pathname)
  return (
    <>
      <div className="flex flex-row">
        {isNeeded && <Navbar />}
        <div className={`${isNeeded ? "lg:pl-52" :""} max-lg:pl-0 flex-1`}>
          <div className="md:p-8 flex flex-col gap-8 p-2">
            {isNeeded && <TopBar />}
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </>
  );
}
