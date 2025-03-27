import { API_ENDPOINTS } from "@/config/apiConfig";
import { useUser } from "@/context/UserContext";
import useApi from "@/hooks/useApi";
import { Html, Head, Main, NextScript } from "next/document";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="/styles/global.css" />
      </Head>
      <body className="bg-[#F8FAFC]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
