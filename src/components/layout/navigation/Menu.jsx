import { MdThermostat } from "react-icons/md";
import MenuItem from "./MenuItem";

const Menu = () => {
  const menuItems = [
    { title: "Weather", icon: MdThermostat },
    { title: "Weather", icon: MdThermostat },
    { title: "Weather", icon: MdThermostat }
  ];
  return (
    <ul className={"flex flex-col gap-6"}>
      {menuItems.map((menuItem) => (
        <MenuItem title={menuItem.title} icon={menuItem.icon} />
      ))}
    </ul>
  );
};

export default Menu;
