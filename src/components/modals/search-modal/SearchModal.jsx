import {
  Box,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { weatherApi } from "../../../api/weatherApi";
import CityList from "./CityList";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../../../store/search-modal/SearchModalSlice";
import { useDebounce } from "../../../hooks/useDebounce";

const SearchModal = () => {
  const focusRef = useRef();
  const [city, setCity] = useState("");
  const debouncedCity = useDebounce(city, 300);
  const dispatch = useDispatch();
  const onClose = () => dispatch(setIsOpen(false));
  const isOpen = useSelector((state) => state.searchModal.isOpen);
  const { data, isLoading } = useQuery(
    ["search city", debouncedCity],
    () => weatherApi.searchCity(city, 5),
    {
      select({ data }) {
        return data;
      }
    }
  );

  return (
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
          <Box position={"relative"}>
            <Input
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
              ref={focusRef}
              size={"lg"}
              placeholder={"City..."}
            />
            {isLoading && <Spinner top={3} right={3} position={"absolute"} color="white" />}
          </Box>
          <CityList cities={data} isLoading={isLoading} />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};
export default SearchModal;
