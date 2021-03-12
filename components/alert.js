import styles from "./alert.module.css";
import cn from "classnames";

export default function Alert({ children, type }) {
  return (
    <div
      className={cn({
        [styles.sucess]: type === "sucess",
        [styles.error]: type === "error",
      })}
    >
      {children}
    </div>
  );
}
