import Layout from "../../layout/Layout";
import { VStack } from "@chakra-ui/react";
import FavouriteCity from "./FavouriteCity";

const FavouriteCitiesPage = () => {
  const favouriteCities = [
    {
      cityName: "Vordernberg",
      countryName: "Austria",
      countryCode: "AT",
      latitude: 47.49,
      longitude: 14.99,
      timezone: "Europe/Vienna"
    },
    {
      cityName: "Vordernberg",
      countryName: "Austria",
      countryCode: "AT",
      latitude: 47.49,
      longitude: 14.99,
      timezone: "Europe/Vienna"
    },
    {
      cityName: "Vordernberg",
      countryName: "Austria",
      countryCode: "AT",
      latitude: 47.49,
      longitude: 14.99,
      timezone: "Europe/Vienna"
    }
  ];

  return (
    <Layout>
      <VStack>
        {favouriteCities.map((favouriteCity) => (
          <FavouriteCity key={favouriteCity.cityName} favouriteCity={favouriteCity} />
        ))}
      </VStack>
    </Layout>
  );
};

export default FavouriteCitiesPage;
