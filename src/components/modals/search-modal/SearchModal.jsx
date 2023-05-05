import {
  Box,
  Button,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { weatherApi } from "../../../api/weatherApi";
import CityList from "./CityList";
import { useQuery } from "react-query";

const SearchModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const focusRef = useRef();
  const [city, setCity] = useState("");
  const { data, isLoading } = useQuery(["search city", city], () => weatherApi.searchCity(city), {
    select({ data }) {
      return data;
    }
  });
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
              <Input
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                ref={focusRef}
                size={"lg"}
                placeholder={"City..."}
              />
            </Box>
            <CityList cities={data} isLoading={isLoading} />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
export default SearchModal;
