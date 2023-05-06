import GradientBlock from "../ui/GradientBlock/GradientBlock";
import Layout from "../layout/Layout";
import { Grid, GridItem } from "@chakra-ui/react";
import SearchModal from "../modals/search-modal/SearchModal";
import CurrentWeather from "./CurrentWeather";

const HomePage = () => {
  return (
    <Layout>
      <Grid w={"full"} templateColumns="1fr 2fr">
        <GridItem>
          <CurrentWeather />
        </GridItem>
        <GridItem w={"full"} h={"full"}>
          <GradientBlock>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A consequatur est
            exercitationem, illo nobis, pariatur perferendis porro provident quibusdam rerum
            tempora, ullam? Dolor illo ipsam ullam voluptas? Adipisci id, rerum!
          </GradientBlock>
        </GridItem>
      </Grid>

      <SearchModal />
    </Layout>
  );
};
export default HomePage;
