import styles from "./GradientedBlock.module.css";
import { Box, useColorMode } from "@chakra-ui/react";

const GradientBlock = ({ children, withoutPaddings, ...rest }) => {
  const { colorMode } = useColorMode();
  return (
    <Box position={"relative"} borderRadius={20} p={!withoutPaddings ? 8 : 0} {...rest}>
      <Box position={"relative"} zIndex={10}>
        {children}
      </Box>
      {colorMode === "dark" && (
        <Box
          borderRadius={20}
          position={"absolute"}
          w={"full"}
          h={"full"}
          top={0}
          left={0}
          opacity={0.2}
          className={styles.canvas}
        >
          <div className={styles.circles}></div>
        </Box>
      )}
    </Box>
  );
};

export default GradientBlock;
