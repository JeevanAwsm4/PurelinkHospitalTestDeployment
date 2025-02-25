import { Html, Head, Main, NextScript } from "next/document";

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
