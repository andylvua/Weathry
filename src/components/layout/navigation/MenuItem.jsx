import { NavLink } from "react-router-dom";
import { Flex, Icon, ListItem } from "@chakra-ui/react";

const MenuItem = ({ icon, direction }) => {
  return (
    <ListItem>
      <NavLink to={direction}>
        <Flex gap={1} position={"relative"} flexDirection={"column"} px={4}>
          <Icon w={7} h={7} color={"white"} as={icon} />
        </Flex>
      </NavLink>
    </ListItem>
  );
};

export default MenuItem;
