import Navbar from "@/components/organisms/navbar/Navbar";
import TopBar from "@/components/organisms/topbar/Topbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="flex flex-row">
        <Navbar />
        <div className="lg:pl-52 max-lg:pl-0 flex-1">
          <div className="p-8 flex flex-col gap-8">
            <TopBar />
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </>
  );
}
