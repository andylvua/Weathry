import Layout from "../../layout/Layout";
import { Divider, VStack, Text } from "@chakra-ui/react";
import FavoriteCity from "./FavoriteCity";
import { useEffect, useState } from "react";

const FavoriteCitiesPage = () => {
  const [favoriteCities, setFavoriteCities] = useState(null);
  const [GPSCity, setGPSCity] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("favoriteCities");
    const GPSCityData = localStorage.getItem("GPSCity");
    setGPSCity(JSON.parse(GPSCityData));
    if (data) {
      setFavoriteCities(JSON.parse(data));
    } else {
      setFavoriteCities([]);
    }
  }, []);

  useEffect(() => {
    if (favoriteCities) {
      localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
    }
  }, [favoriteCities]);

  if (!favoriteCities) {
    return <Layout></Layout>;
  }

  return (
    <Layout>
      <VStack mt={5} spacing={7}>
        {GPSCity && (
          <>
            <Text fontSize={"2xl"} color={"white"}>
              Geo-located city
            </Text>
            <FavoriteCity isGeolocated={true} favoriteCity={GPSCity} />
            <Divider bg={"white"} />
          </>
        )}
        <Text fontSize={"2xl"} color={"white"}>
          Favorite cities
        </Text>
        {favoriteCities.map((favoriteCity) => (
          <FavoriteCity key={favoriteCity.id} favoriteCity={favoriteCity} />
        ))}
      </VStack>
    </Layout>
  );
};

export default FavoriteCitiesPage;
