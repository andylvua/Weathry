import { MdEmail, MdFavorite, MdThermostat } from "react-icons/md";
import MenuItem from "./MenuItem";
import { List } from "@chakra-ui/react";

const Menu = () => {
  const menuItems = [
    { icon: MdThermostat, direction: "/" },
    { icon: MdFavorite, direction: "/favourite" },
    { icon: MdEmail, direction: "/feedback" }
  ];
  return (
    <List display={"flex"} gap={8} flexDirection={"column"}>
      {menuItems.map((menuItem) => (
        <MenuItem key={menuItem.direction} icon={menuItem.icon} direction={menuItem.direction} />
      ))}
    </List>
  );
};

export default Menu;
