import Head from "next/head";
import { Header, SideBar } from "./header";
import { Footer } from "./footer";
import { useEffect, useState } from "react";
import { Page } from "src/components/motion/page";

export const siteTitle = "Jongsun Park | Portfolio";

const Layout = ({ title, children }) => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{title || siteTitle}</title>
      </Head>
      {open && <SideBar open={open} setOpen={setOpen} />}
      <Header open={open} setOpen={setOpen} />
      <Page>{children}</Page>
      <Footer />
    </>
  );
};

export default Layout;
