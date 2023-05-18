import styles from "./GradientedBlock.module.css";
import { Box } from "@chakra-ui/react";

const GradientBlock = ({ children, withoutPaddings, ...rest }) => {
  return (
    <Box position={"relative"} borderRadius={20} p={!withoutPaddings ? 8 : 0} {...rest}>
      <Box position={"relative"} zIndex={10}>
        {children}
      </Box>

      <Box
        borderRadius={{ sm: 20, usm: 12 }}
        position={"absolute"}
        w={"full"}
        h={"full"}
        top={0}
        left={0}
        opacity={0.2}
        className={styles.canvas}
      >
      </Box>
    </Box>
  );
};

export default GradientBlock;
