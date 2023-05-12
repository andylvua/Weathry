import Layout from "../../layout/Layout";
import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import { Box, Center, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

const SettingsPage = () => {
  const [temperature, setTemperature] = useState("celsius"); // fahrenheit
  const [windSpeed, setWindSpeed] = useState("km"); // ms | mph | kn
  const [precipitation, setPrecipitation] = useState("millimeter"); // inch

  const getWindSpeedPosition = () => {
    if (windSpeed === "km") {
      return "0%";
    }
    if (windSpeed === "ms") {
      return "25%";
    }
    if (windSpeed === "mph") {
      return "50%";
    }
    if (windSpeed === "kn") {
      return "75%";
    }
  };

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
                left: temperature === "celsius" ? 0 : "50%",
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
                onClick={() => setTemperature("celsius")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={temperature === "celsius" ? "white" : ""}
                  position={"relative"}
                  zi={3}
                  textAlign={"center"}
                  fontSize={"xl"}
                >
                  Celsius
                </Text>
              </Center>

              <Center
                onClick={() => setTemperature("fahrenheit")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={temperature === "fahrenheit" ? "white" : ""}
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
                onClick={() => setWindSpeed("km")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={windSpeed === "km" ? "white" : ""}
                  position={"relative"}
                  zi={3}
                  textAlign={"center"}
                  fontSize={"xl"}
                >
                  Km/h
                </Text>
              </Center>

              <Center
                onClick={() => setWindSpeed("ms")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={windSpeed === "ms" ? "white" : ""}
                  position={"relative"}
                  zi={3}
                  textAlign={"center"}
                  fontSize={"xl"}
                >
                  m/s
                </Text>
              </Center>

              <Center
                onClick={() => setWindSpeed("mph")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={windSpeed === "mph" ? "white" : ""}
                  position={"relative"}
                  zi={3}
                  textAlign={"center"}
                  fontSize={"xl"}
                >
                  Mph
                </Text>
              </Center>

              <Center
                onClick={() => setWindSpeed("kn")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={windSpeed === "kn" ? "white" : ""}
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
                left: precipitation === "millimeter" ? 0 : "50%",
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
                onClick={() => setPrecipitation("millimeter")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={precipitation === "millimeter" ? "white" : ""}
                  position={"relative"}
                  zi={3}
                  textAlign={"center"}
                  fontSize={"xl"}
                >
                  Millimeter
                </Text>
              </Center>

              <Center
                onClick={() => setPrecipitation("inch")}
                cursor={"pointer"}
                alignItems={"center"}
                px={3}
                py={1}
                flexBasis={"50%"}
              >
                <Text
                  color={precipitation === "inch" ? "white" : ""}
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
        </VStack>
      </GradientBlock>
    </Layout>
  );
};

export default SettingsPage;
