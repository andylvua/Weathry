import Layout from "../../layout/Layout";
import { Grid, GridItem } from "@chakra-ui/react";
import SearchModal from "../../modals/search-modal/SearchModal";
import CurrentWeather from "./CurrentWeather";
import TodayHighlight from "./TodayHighlight";
import Forecast from "./Forecast";

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
      <Grid mt={8} templateColumns="1fr 2fr">
        <GridItem>
          <Forecast />
        </GridItem>
      </Grid>
      <SearchModal />
    </Layout>
  );
};
export default HomePage;
