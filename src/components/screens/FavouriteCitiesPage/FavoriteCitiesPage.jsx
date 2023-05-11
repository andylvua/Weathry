import Layout from "../../layout/Layout";
import { VStack } from "@chakra-ui/react";
import FavoriteCity from "./FavouriteCity";
import { useEffect, useState } from "react";

const FavoriteCitiesPage = () => {
  const [favoriteCities, setFavoriteCities] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("favoriteCities");
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
      <VStack>
        {favoriteCities.map((favoriteCity) => (
          <FavoriteCity key={favoriteCity.id} favouriteCity={favoriteCity} />
        ))}
      </VStack>
    </Layout>
  );
};

export default FavoriteCitiesPage;
