import Layout from "../../layout/Layout";
import { Divider, VStack } from "@chakra-ui/react";
import FavoriteCity from "./FavouriteCity";
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
            <FavoriteCity favouriteCity={GPSCity} />
            <Divider bg={"white"} />
          </>
        )}
        {favoriteCities.map((favoriteCity) => (
          <FavoriteCity key={favoriteCity.id} favouriteCity={favoriteCity} />
        ))}
      </VStack>
    </Layout>
  );
};

export default FavoriteCitiesPage;
