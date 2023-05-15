import Layout from "../../layout/Layout";
import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import { Box, Center, Divider, Flex, Heading, Switch, Text, VStack } from "@chakra-ui/react";
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
      <Heading textAlign={"center"} mt={20} mb={10} color={"white"}>
        Settings
      </Heading>
      <VStack w={"70%"} spacing={5} withoutPaddings={true} alignItems={"flex-start"} mx={"auto"}>
        <Text fontSize={"2xl"} color={"white"} fontWeight={"bold"} pl={2}>
          Units
        </Text>
        <GradientBlock withoutPaddings={true} pt={3} p={2} mt={5} mx={"auto"} w={"full"}>
          <VStack w={"full"} spacing={2} alignItems={"flex-start"}>
            <Box px={{ sm: 5, usm: 1 }} py={{ sm: 5, usm: 2 }} w={"full"}>
              <Text fontWeight={"bold"} color={"lightgray"}>
                Temperature
              </Text>
              <Flex
                _before={{
                  content: `""`,
                  position: "absolute",
                  transition: "all ease .3s",
                  left: temperatureUnit === "celsius" ? 0 : "50%",
                  display: "block",
                  bg: "rgba(255,255,255,0.15)",
                  w: "49%",
                  height: "80%",
                  mt: 1,
                  ml: 1,
                  mr: 1,
                  borderRadius: 7,
                  zIndex: 2
                }}
                position={"relative"}
                mt={4}
                borderRadius={10}
                bg={"rgba(255,255,255,0.07)"}
              >
                <Center
                  onClick={() => setTemperatureUnit("celsius")}
                  cursor={"pointer"}
                  alignItems={"center"}
                  px={3}
                  py={2}
                  flexBasis={"50%"}
                >
                  <Text
                    color={temperatureUnit === "celsius" ? "white" : ""}
                    position={"relative"}
                    zIndex={3}
                    textAlign={"center"}
                  >
                    Celsius
                  </Text>
                </Center>
                <Center>
                  <Divider orientation={"vertical"} height={"60%"} />
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
                    zIndex={3}
                    textAlign={"center"}
                  >
                    Fahrenheit
                  </Text>
                </Center>
              </Flex>
            </Box>
            <Divider width={"95%"} alignSelf={"center"} />
            <Box px={{ sm: 5, usm: 1 }} py={{ sm: 5, usm: 2 }} w={"full"}>
              <Text fontWeight={"bold"} color={"lightgray"}>
                Wind speed
              </Text>
              <Flex
                _before={{
                  content: `""`,
                  position: "absolute",
                  transition: "all ease .3s",
                  left: getWindSpeedPosition(),
                  display: "block",
                  bg: "rgba(255,255,255,0.15)",
                  w: "24%",
                  height: "80%",
                  mt: 1,
                  ml: 1,
                  mr: 1,
                  borderRadius: 7,
                  zIndex: 2
                }}
                position={"relative"}
                mt={4}
                borderRadius={10}
                bg={"rgba(255,255,255,0.07)"}
              >
                <Center
                  onClick={() => setWindSpeedUnit("km")}
                  cursor={"pointer"}
                  alignItems={"center"}
                  px={3}
                  py={2}
                  flexBasis={"50%"}
                >
                  <Text
                    color={windSpeedUnit === "km" ? "white" : ""}
                    position={"relative"}
                    zIndex={3}
                    textAlign={"center"}
                  >
                    km/h
                  </Text>
                </Center>
                <Center>
                  <Divider orientation={"vertical"} height={"60%"} zIndex={1} />
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
                    zIndex={3}
                    textAlign={"center"}
                  >
                    m/s
                  </Text>
                </Center>
                <Center>
                  <Divider orientation={"vertical"} height={"60%"} />
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
                    zIndex={3}
                    textAlign={"center"}
                  >
                    mph
                  </Text>
                </Center>
                <Center>
                  <Divider orientation={"vertical"} height={"60%"} />
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
                    zIndex={3}
                    textAlign={"center"}
                  >
                    Knots
                  </Text>
                </Center>
              </Flex>
            </Box>
          </VStack>
        </GradientBlock>

        <Text fontSize={"2xl"} color={"white"} fontWeight={"bold"} pl={2}>
          General
        </Text>
        <GradientBlock withoutPaddings={true} pt={2} p={2} mt={5} mx={"auto"} w={"full"}>
          <Box
            px={{ sm: 5, usm: 1 }}
            py={{ sm: 5, usm: 2 }}
            w={"full"}
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontWeight={"bold"} color={"lightgray"}>
              Automatic location
            </Text>

            <Switch
              onChange={() => (autoGps === "on" ? setAutoGps("off") : setAutoGps("on"))}
              isChecked={autoGps === "on"}
              size="lg"
            />
          </Box>
        </GradientBlock>
      </VStack>
    </Layout>
  );
};

export default SettingsPage;
