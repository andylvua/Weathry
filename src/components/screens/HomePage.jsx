import Layout from "../layout/Layout";
import { Grid, GridItem } from "@chakra-ui/react";
import SearchModal from "../modals/search-modal/SearchModal";
import CurrentWeather from "./CurrentWeather";
import TodayHighlight from "./TodayHighlight";

const HomePage = () => {
  return (
    <Layout>
      <Grid gap={4} minW={"full"} templateColumns="1fr 2fr">
        <GridItem>
          <CurrentWeather />
        </GridItem>
        <GridItem w={"full"} h={"full"}>
          <TodayHighlight />
        </GridItem>
      </Grid>

      <SearchModal />
    </Layout>
  );
};
export default HomePage;
