import styles from "./GradientedBlock.module.css";
import classNames from "classnames";

const GradientBlock = ({ children, className }) => {
  return (
    <div className={"relative p-8 rounded-3xl"}>
      <div className={classNames("relative z-10", className)}>{children}</div>
      <div
        className={classNames(
          "rounded-3xl absolute w-full h-full top-0 left-0 opacity-20",
          styles.canvas
        )}
      >
        <div className={styles.circles}></div>
      </div>
    </div>
  );
};

export default GradientBlock;
