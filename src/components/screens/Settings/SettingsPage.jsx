import Layout from "../../layout/Layout";
import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import { Box, Center, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const SettingsPage = () => {
  const [temperatureUnit, setTemperatureUnit] = useState(""); // celsius | fahrenheit
  const [windSpeedUnit, setWindSpeedUnit] = useState(""); // km | ms | mph | kn
  const [precipitationUnit, setPrecipitationUnit] = useState(""); // millimeter | inch

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
  }, []);

  useEffect(() => {
    if (temperatureUnit) {
      localStorage.setItem("temperatureUnit", temperatureUnit);
    }
  }, [temperatureUnit]);

  useEffect(() => {
    if (temperatureUnit) {
      localStorage.setItem("windSpeedUnit", windSpeedUnit);
    }
  }, [windSpeedUnit]);

  useEffect(() => {
    if (temperatureUnit) {
      localStorage.setItem("precipitationUnit", precipitationUnit);
    }
  }, [precipitationUnit]);

  return (
    <Layout>
      <GradientBlock mt={5} mx={"auto"} maxW={800}>
        <VStack w={"full"} spacing={5}>
          <Heading textAlign={"center"}>Settings</Heading>
          <Box w={"full"}>
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
                  fontSize={"xl"}
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
                  fontSize={"xl"}
                >
                  Fahrenheit
                </Text>
              </Center>
            </Flex>
          </Box>
          <Box w={"full"}>
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
                  fontSize={"xl"}
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
                  fontSize={"xl"}
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
                  fontSize={"xl"}
                >
                  Knots
                </Text>
              </Center>
            </Flex>
          </Box>
          <Box w={"full"}>
            <Text fontSize={"2xl"} color={"white"}>
              Precipitation
            </Text>
            <Flex
              _before={{
                content: `""`,
                position: "absolute",
                transition: "all ease .3s",
                left: precipitationUnit === "millimeter" ? 0 : "50%",
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
                onClick={() => setPrecipitationUnit("millimeter")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={precipitationUnit === "millimeter" ? "white" : ""}
                  position={"relative"}
                  zi={3}
                  textAlign={"center"}
                  fontSize={"xl"}
                >
                  Millimeter
                </Text>
              </Center>

              <Center
                onClick={() => setPrecipitationUnit("inch")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={precipitationUnit === "inch" ? "white" : ""}
                  position={"relative"}
                  zi={3}
                  textAlign={"center"}
                  fontSize={"xl"}
                >
                  Inch
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
