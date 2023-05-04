import GradientBlock from "../ui/GradientBlock/GradientBlock";
import Layout from "../layout/Layout";
import { Button, Flex, useColorMode } from "@chakra-ui/react";
import { Text } from "../ui/Text/Text";
import { Heading } from "../ui/Text/Heading";

const HomePage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
      <Button onClick={toggleColorMode}>Toggle {colorMode === "light" ? "Dark" : "Light"}</Button>
    </Layout>
  );
};
export default HomePage;
