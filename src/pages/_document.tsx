import "@/styles/global.css"; // Use imports instead
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body className="bg-[#F8FAFC]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
