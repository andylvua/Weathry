import Layout from "../../layout/Layout";
import { Divider, VStack, Text } from "@chakra-ui/react";
import FavoriteCity from "./FavoriteCity";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  const { autoGps } = useSelector((state) => state.units);
  useEffect(() => {
    if (favoriteCities) {
      localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
    }
  }, [favoriteCities]);

  const deleteFromFavoriteList = (cityId) => {
    setFavoriteCities((prev) => prev.filter((el) => el.id !== cityId));
  };

  if (!favoriteCities) {
    return <Layout></Layout>;
  }

  return (
    <Layout>
      <VStack mt={5} spacing={7}>
        {GPSCity && autoGps === "on" ? (
          <>
            <Text fontSize={"2xl"} color={"white"}>
              Geo-located city
            </Text>
            <FavoriteCity
              deleteFromFavoriteList={deleteFromFavoriteList}
              isGeolocated={true}
              favoriteCity={GPSCity}
            />
            <Divider bg={"white"} />
          </>
        ) : (
          <></>
        )}
        <Text fontSize={"2xl"} color={"white"}>
          Favorite cities
        </Text>
        {favoriteCities.map((favoriteCity) => (
          <FavoriteCity
            deleteFromFavoriteList={deleteFromFavoriteList}
            key={favoriteCity.id}
            favoriteCity={favoriteCity}
          />
        ))}
      </VStack>
    </Layout>
  );
};

export default FavoriteCitiesPage;
