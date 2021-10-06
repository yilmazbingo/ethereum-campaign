import React, { useEffect } from "react";
import Router from "next/router";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window.web3 === "undefined") {
      Router.push("/");
    }
  }, [typeof window !== "undefined" && window.web3]);
  return <Component {...pageProps} />;
}

export default MyApp;
