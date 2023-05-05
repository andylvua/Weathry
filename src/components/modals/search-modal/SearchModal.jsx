import {
  Box,
  Button,
  Heading,
  Icon,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { MdLocationCity } from "react-icons/md";

const SearchModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const focusRef = useRef();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal
        initialFocusRef={focusRef}
        size={"xl"}
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading fontSize={"3xl"} color={"white"}>
              Search city
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Input ref={focusRef} size={"lg"} placeholder={"City..."} />
            </Box>
            <List mt={3} display={"flex"} flexDirection={"column"} gap={3}>
              <ListItem
                gap={3}
                alignItems={"center"}
                cursor={"pointer"}
                px={4}
                py={2}
                borderRadius={15}
                display={"flex"}
                bg={"gray.600"}
                transition={"all .2s ease"}
                _hover={{
                  bg: "gray.800"
                }}
              >
                <Icon color={"white"} w={8} h={8} as={MdLocationCity} />
                <Text color={"white"} fontSize={"2xl"}>
                  Vienna
                </Text>
                <Spacer />
                <Text color={"white"} fontSize={"2xl"}>
                  20°C
                </Text>
              </ListItem>
              <ListItem
                gap={3}
                alignItems={"center"}
                cursor={"pointer"}
                px={4}
                py={2}
                borderRadius={15}
                display={"flex"}
                bg={"gray.600"}
                transition={"all .2s ease"}
                _hover={{
                  bg: "gray.800"
                }}
              >
                <Icon color={"white"} w={8} h={8} as={MdLocationCity} />
                <Text color={"white"} fontSize={"2xl"}>
                  Vordernberg
                </Text>
                <Spacer />
                <Text color={"white"} fontSize={"2xl"}>
                  15°C
                </Text>
              </ListItem>
            </List>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
export default SearchModal;
