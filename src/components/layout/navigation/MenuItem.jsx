import { NavLink } from "react-router-dom";
import { Center, Icon, ListItem, useColorModeValue } from "@chakra-ui/react";
import styles from "./Navitgation.module.css";

const MenuItem = ({ icon, direction }) => {
  const color = useColorModeValue("black", "text.100");
  return (
    <ListItem>
      <NavLink className={(navData) => (navData.isActive ? styles.active : "")} to={direction}>
        <Center className={styles.menuItem} px={5} py={1.5}>
          <Icon w={7} h={7} color={color} as={icon} />
        </Center>
      </NavLink>
    </ListItem>
  );
};

export default MenuItem;
