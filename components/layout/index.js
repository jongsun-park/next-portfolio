import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";

export const siteTitle = "Jongsun Park | Portfolio";

const Layout = ({ home, children }) => (
  <>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <Header />
    {children}
    <Footer />
  </>
);

export default Layout;
