import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, title = "Narnidash | Dashboard & Wiki" }: any) => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>{title}</title>
    </Head>
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
