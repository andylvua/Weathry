import { MdThermostat } from "react-icons/md";
import MenuItem from "./MenuItem";
import { List } from "@chakra-ui/react";

const Menu = () => {
  const menuItems = [{ icon: MdThermostat, direction: "/" }];
  return (
    <List gap={6}>
      {menuItems.map((menuItem) => (
        <MenuItem icon={menuItem.icon} direction={menuItem.direction} />
      ))}
    </List>
  );
};

export default Menu;
