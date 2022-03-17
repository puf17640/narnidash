import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Web3ContextProvider } from "../context/Web3Context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ContextProvider>
      <>
        <Component {...pageProps} />
        <ToastContainer
          newestOnTop
          hideProgressBar
          autoClose={1000}
          closeButton={false}
          position={"bottom-right"}
          toastClassName={() =>
            "rounded-lg bg-umbriagrey-background border-umbriagrey-border border my-2 mx-4 text-umbria-500 p-2"
          }
        />
      </>
    </Web3ContextProvider>
  );
}

export default MyApp;
