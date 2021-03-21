import "src/styles/globals.scss";
import "swiper/swiper-bundle.min.css";

import { motion, AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps, router }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div key={router.route}>
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );
}
