import GradientBlock from "../ui/GradientBlock/GradientBlock";
import Layout from "../layout/Layout";
import { Flex, Heading, Text } from "@chakra-ui/react";
import SearchModal from "../modals/search-modal/SearchModal";

const HomePage = () => {
  return (
    <Layout>
      <GradientBlock>
        <Heading>Some title</Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet atque debitis
          dolorum facere fugiat inventore labore modi obcaecati quaerat quas quisquam quod, ratione
          sed suscipit! Exercitationem nihil odio perspiciatis.
        </Text>
      </GradientBlock>
      <Flex gap={3} mt={3}>
        <GradientBlock>
          <Heading>Some title</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet atque debitis
            dolorum facere fugiat inventore labore modi obcaecati quaerat quas quisquam quod,
            ratione sed suscipit! Exercitationem nihil odio perspiciatis.
          </Text>
        </GradientBlock>
        <GradientBlock>
          <Heading>Some title</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet atque debitis
            dolorum facere fugiat inventore labore modi obcaecati quaerat quas quisquam quod,
            ratione sed suscipit! Exercitationem nihil odio perspiciatis.
          </Text>
        </GradientBlock>
      </Flex>
      <SearchModal />
    </Layout>
  );
};
export default HomePage;
