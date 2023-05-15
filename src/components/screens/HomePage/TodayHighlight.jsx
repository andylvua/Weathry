import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { weatherApi } from "../../../api/weatherApi";
import { Box, Flex, Grid, GridItem, Icon, Spacer, Text } from "@chakra-ui/react";
import { getCurrentHour } from "../../../utils/time";
import {
  MdAir,
  MdCompress,
  MdLightMode,
  MdOpacity,
  MdThermostat,
  MdVisibility
} from "react-icons/md";

const TodayHighlight = () => {
  const { latitude, longitude, timezone } = useSelector((state) => state.location);
  const { temperatureUnit, windSpeedUnit } = useSelector((state) => state.units);

  const { data: hourlyWeatherData } = useQuery(
    ["hourly weather", latitude, longitude],
    () => weatherApi.hourlyWeather(latitude, longitude, { temperatureUnit, windSpeedUnit }),
    {
      select({ data }) {
        return data;
      }
    }
  );

  const { data: dailyWeatherData } = useQuery(
    ["daily weather", latitude, longitude],
    () =>
      weatherApi.dailyWeather(latitude, longitude, timezone, { temperatureUnit, windSpeedUnit }),
    {
      select({ data }) {
        return data;
      }
    }
  );

  if (!hourlyWeatherData || !dailyWeatherData) {
    return null;
  }

  const gridItemProps = {
    borderRadius: 13,
    p: 3,
    bg: "rgba(29,31,32,0.24)"
  };

  const generateGridItem = (icon, title, value, unit) => {
    return (
      <GridItem {...gridItemProps}>
        <Text fontSize={{ sm: "xm", usm: "xs", lg: "sm" }}>{title}</Text>
        <Flex mt={5} alignItems={"end"}>
          <Flex alignItems={"end"} gap={{ xl: 3, usm: 1 }}>
            <Text lineHeight={1} color={"white"} fontSize={{ xl: "4xl", lg: "2xl", md: "xl" }}>
              {value}
            </Text>
            <Text lineHeight={{ xl: 1.5, sm: 1 }} fontSize={{ sm: "lg", usm: "xs" }}>
              {unit}
            </Text>
          </Flex>
          <Spacer />
          <Icon w={{ sm: 6, usm: 3 }} h={{ sm: 6, usm: 3 }} as={icon} />
        </Flex>
      </GridItem>
    );
  };

  return (
    <GradientBlock h={"full"} withoutPaddings={true}>
      <Box p={{ sm: 5, usm: 3 }}>
        <Text fontSize={"xl"} color={"white"} fontWeight={"medium"}>
          Today's Highlight
        </Text>
        <Grid
          mt={{ sm: 8, usm: 3 }}
          gridColumnGap={{ sm: 3, usm: 1 }}
          gridRowGap={{ lg: 6, usm: 1 }}
          gridTemplateColumns={{ lg: "1fr 1fr 1fr", usm: "1fr 1fr" }}
          w={"full"}
        >
          {generateGridItem(
            MdAir,
            "Wind Status",
            hourlyWeatherData.hourly["windspeed_10m"][getCurrentHour()],
            hourlyWeatherData["hourly_units"]["windspeed_10m"]
          )}
          {generateGridItem(
            MdLightMode,
            "UV Index",
            dailyWeatherData.daily["uv_index_max"][0],
            "uv"
          )}
          {generateGridItem(
            MdOpacity,
            "Humidity",
            hourlyWeatherData.hourly["relativehumidity_2m"][getCurrentHour()],
            "%"
          )}
          {generateGridItem(
            MdVisibility,
            "Visibility",
            (hourlyWeatherData.hourly["visibility"][getCurrentHour()] / 1000).toFixed(1),
            "km"
          )}
          {generateGridItem(
            MdThermostat,
            "Feels like",
            hourlyWeatherData.hourly["apparent_temperature"][getCurrentHour()] +
              hourlyWeatherData["hourly_units"]["apparent_temperature"],
            ""
          )}
          {generateGridItem(
            MdCompress,
            "Pressure",
            hourlyWeatherData.hourly["pressure_msl"][getCurrentHour()],
            "hPa"
          )}
        </Grid>
      </Box>
    </GradientBlock>
  );
};

export default TodayHighlight;
