import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";

export const siteTitle = "Jongsun Park | Portfolio";

const Layout = ({ children }) => (
  <div className="layout">
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
