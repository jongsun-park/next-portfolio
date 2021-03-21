import { motion } from "framer-motion";

const pageVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 1.5, duration: 1.5 } },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const pageMotionProps = {
  variants: pageVariant,
  initial: "hidden",
  animate: "visible",
  exit: "exit",
};

export const Page = ({ children }) => (
  <motion.div {...pageMotionProps}>{children}</motion.div>
);
