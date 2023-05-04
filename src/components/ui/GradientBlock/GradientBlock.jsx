import styles from "./GradientedBlock.module.css";
import classNames from "classnames";

const GradientBlock = ({ children, className, withoutPaddings }) => {
  return (
    <div className={classNames("relative rounded-3xl", { "p-8": !withoutPaddings }, className)}>
      <div className={classNames("relative z-10")}>{children}</div>
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
