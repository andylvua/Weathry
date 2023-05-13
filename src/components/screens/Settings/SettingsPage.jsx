import Layout from "../../layout/Layout";
import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import { Box, Center, Divider, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setTemperatureUnit as setTemperatureUnitRedux,
  setWindSpeedUnit as setWindSpeedUnitRedux,
  setPrecipitationUnit as setPrecipitationUnitRedux,
  setAutoGps as setAutoGpsRedux
} from "../../../store/units/UnitsSlice";

const SettingsPage = () => {
  const [temperatureUnit, setTemperatureUnit] = useState(""); // celsius | fahrenheit
  const [windSpeedUnit, setWindSpeedUnit] = useState(""); // km | ms | mph | kn
  const [precipitationUnit, setPrecipitationUnit] = useState(""); // millimeter | inch
  const [autoGps, setAutoGps] = useState("");
  const dispatch = useDispatch();

  const getWindSpeedPosition = () => {
    if (windSpeedUnit === "km") {
      return "0%";
    }
    if (windSpeedUnit === "ms") {
      return "25%";
    }
    if (windSpeedUnit === "mph") {
      return "50%";
    }
    if (windSpeedUnit === "kn") {
      return "75%";
    }
  };

  useEffect(() => {
    const temperatureUnitData = localStorage.getItem("temperatureUnit");
    const windSpeedUnitData = localStorage.getItem("windSpeedUnit");
    const precipitationUnitData = localStorage.getItem("precipitationUnit");
    const autoGpsData = localStorage.getItem("autoGps");

    if (temperatureUnitData) {
      setTemperatureUnit(temperatureUnitData);
    } else {
      setTemperatureUnit("celsius");
    }

    if (windSpeedUnitData) {
      setWindSpeedUnit(windSpeedUnitData);
    } else {
      setWindSpeedUnit("km");
    }

    if (precipitationUnitData) {
      setPrecipitationUnit(precipitationUnitData);
    } else {
      setPrecipitationUnit("millimeter");
    }

    if (autoGpsData) {
      setAutoGps(autoGpsData);
    } else {
      setAutoGps("on");
    }
  }, []);

  useEffect(() => {
    if (temperatureUnit) {
      localStorage.setItem("temperatureUnit", temperatureUnit);
      dispatch(setTemperatureUnitRedux(temperatureUnit));
    }
  }, [temperatureUnit]);

  useEffect(() => {
    if (windSpeedUnit) {
      localStorage.setItem("windSpeedUnit", windSpeedUnit);
      dispatch(setWindSpeedUnitRedux(windSpeedUnit));
    }
  }, [windSpeedUnit]);

  useEffect(() => {
    if (precipitationUnit) {
      localStorage.setItem("precipitationUnit", precipitationUnit);
      dispatch(setPrecipitationUnitRedux(precipitationUnit));
    }
  }, [precipitationUnit]);

  useEffect(() => {
    if (autoGps) {
      localStorage.setItem("autoGps", autoGps);
      dispatch(setAutoGpsRedux(autoGps));
    }
  }, [autoGps]);

  if (!temperatureUnit || !windSpeedUnit || !precipitationUnit) {
    return <Layout></Layout>;
  }

  return (
    <Layout>
      <GradientBlock withoutPaddings={true} pt={7} p={2} mt={5} mx={"auto"} maxW={800}>
        <VStack w={"full"} spacing={5}>
          <Heading textAlign={"center"}>Settings</Heading>
          <Box
            px={{ sm: 5, usm: 1 }}
            py={{ sm: 5, usm: 2 }}
            borderRadius={7}
            bg={"rgba(29,31,32,0.44)"}
            w={"full"}
          >
            <Text fontSize={"2xl"} color={"white"}>
              Temperature
            </Text>
            <Flex
              _before={{
                content: `""`,
                position: "absolute",
                transition: "all ease .3s",
                left: temperatureUnit === "celsius" ? 0 : "50%",
                display: "block",
                bg: "blue.800",
                w: "49%",
                height: "80%",
                mt: 1,
                ml: 1,
                mr: 1,
                borderRadius: 10
              }}
              position={"relative"}
              mt={4}
              borderRadius={10}
              bg={"rgba(29,31,32,1)"}
            >
              <Center
                onClick={() => setTemperatureUnit("celsius")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={temperatureUnit === "celsius" ? "white" : ""}
                  position={"relative"}
                  zi={3}
                  textAlign={"center"}
                  fontSize={{ sm: "xl", usm: "md" }}
                >
                  Celsius
                </Text>
              </Center>

              <Center
                onClick={() => setTemperatureUnit("fahrenheit")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={temperatureUnit === "fahrenheit" ? "white" : ""}
                  position={"relative"}
                  zi={3}
                  textAlign={"center"}
                  fontSize={{ sm: "xl", usm: "md" }}
                >
                  Fahrenheit
                </Text>
              </Center>
            </Flex>
          </Box>
          <Box
            px={{ sm: 5, usm: 1 }}
            py={{ sm: 5, usm: 2 }}
            borderRadius={7}
            bg={"rgba(29,31,32,0.44)"}
            w={"full"}
          >
            <Text fontSize={"2xl"} color={"white"}>
              Wind speed
            </Text>
            <Flex
              _before={{
                content: `""`,
                position: "absolute",
                transition: "all ease .3s",
                left: getWindSpeedPosition(),
                display: "block",
                bg: "blue.800",
                w: "24%",
                height: "80%",
                mt: 1,
                ml: 1,
                mr: 1,
                borderRadius: 10
              }}
              position={"relative"}
              mt={4}
              borderRadius={10}
              bg={"rgba(29,31,32,1)"}
            >
              <Center
                onClick={() => setWindSpeedUnit("km")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={windSpeedUnit === "km" ? "white" : ""}
                  position={"relative"}
                  zi={3}
                  textAlign={"center"}
                  fontSize={{ sm: "xl", usm: "md" }}
                >
                  Km/h
                </Text>
              </Center>

              <Center
                onClick={() => setWindSpeedUnit("ms")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={windSpeedUnit === "ms" ? "white" : ""}
                  position={"relative"}
                  zi={3}
                  textAlign={"center"}
                  fontSize={"xl"}
                >
                  m/s
                </Text>
              </Center>

              <Center
                onClick={() => setWindSpeedUnit("mph")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={windSpeedUnit === "mph" ? "white" : ""}
                  position={"relative"}
                  zi={3}
                  textAlign={"center"}
                  fontSize={{ sm: "xl", usm: "md" }}
                >
                  Mph
                </Text>
              </Center>

              <Center
                onClick={() => setWindSpeedUnit("kn")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={windSpeedUnit === "kn" ? "white" : ""}
                  position={"relative"}
                  zi={3}
                  textAlign={"center"}
                  fontSize={{ sm: "xl", usm: "md" }}
                >
                  Knots
                </Text>
              </Center>
            </Flex>
          </Box>
          <Divider bg={"white"} />
          <Box
            px={{ sm: 5, usm: 1 }}
            py={{ sm: 5, usm: 2 }}
            borderRadius={7}
            bg={"rgba(29,31,32,0.44)"}
            w={"full"}
          >
            <Text fontSize={"2xl"} color={"white"}>
              Auto GPS
            </Text>
            <Flex
              _before={{
                content: `""`,
                position: "absolute",
                transition: "all ease .3s",
                left: autoGps !== "on" ? "50%" : 0,
                display: "block",
                bg: "blue.800",
                w: "49%",
                height: "80%",
                mt: 1,
                ml: 1,
                mr: 1,
                borderRadius: 10
              }}
              position={"relative"}
              mt={4}
              borderRadius={10}
              bg={"rgba(29,31,32,1)"}
            >
              <Center
                onClick={() => setAutoGps("on")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={autoGps === "on" ? "white" : ""}
                  position={"relative"}
                  zi={3}
                  textAlign={"center"}
                  fontSize={{ sm: "xl", usm: "md" }}
                >
                  On
                </Text>
              </Center>

              <Center
                onClick={() => setAutoGps("off")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={autoGps === "off" ? "white" : ""}
                  position={"relative"}
                  zi={3}
                  textAlign={"center"}
                  fontSize={{ sm: "xl", usm: "md" }}
                >
                  Off
                </Text>
              </Center>
            </Flex>
          </Box>
        </VStack>
      </GradientBlock>
    </Layout>
  );
};

export default SettingsPage;
