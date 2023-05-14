import { CiGrid41, CiLocationOn, CiSettings, CiMail } from "react-icons/ci";
import MenuItem from "./MenuItem";
import { List } from "@chakra-ui/react";

const Menu = () => {
  const menuItems = [
    { icon: CiGrid41, direction: "/" },
    { icon: CiLocationOn, direction: "/favourite" },
    { icon: CiSettings, direction: "/settings" },
    { icon: CiMail, direction: "/feedback" }
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
