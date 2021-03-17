import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import { useEffect } from "react";
import { motion } from "framer-motion";

export const siteTitle = "Jongsun Park | Portfolio";

const Layout = ({ children }) => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  return (
    <motion.div
      className="layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </motion.div>
  );
};

export default Layout;
