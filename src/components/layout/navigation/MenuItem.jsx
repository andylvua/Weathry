import { NavLink } from "react-router-dom";
import { Icon } from "@chakra-ui/react";

const MenuItem = ({ icon, title }) => {
  return (
    <li>
      <NavLink
        className={
          "flex gap-1 relative flex-col items-center px-4 before:h-full before:w-0 hover:before:w-0.5 before:transition-all before:bg-white before:block before:absolute before:left-0 before:rounded-2xl before:opacity-60"
        }
        to={"/"}
      >
        <Icon w={7} h={7} color={"white"} as={icon} />
        <div className={"text-white"}>{title}</div>
      </NavLink>
    </li>
  );
};

export default MenuItem;
