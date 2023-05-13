import { NavLink } from "react-router-dom";
import { Center, Icon, ListItem, useColorModeValue } from "@chakra-ui/react";
import styles from "./Navitgation.module.css";

const MenuItem = ({ icon, direction }) => {
  const color = useColorModeValue("black", "text.100");
  return (
    <ListItem>
      <NavLink className={(navData) => (navData.isActive ? styles.active : "")} to={direction}>
        <Center className={styles.menuItem} px={{ sm: 5, usm: 3 }} py={1.5}>
          <Icon w={{ sm: 7, usm: 5 }} h={{ sm: 7, usm: 5 }} color={color} as={icon} />
        </Center>
      </NavLink>
    </ListItem>
  );
};

export default MenuItem;
